import { Group } from '../types.ts';

/**
 * Note: To check which actions are actually running
 * and thus can be overridden here, use Redux DevTools in the browser
 * @ref https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/plugin-api.md
 * @ref https://github.com/swagger-api/swagger-ui/blob/master/src/plugins/add-plugin.md
 */
const CustomActionsPlugin = function(system) {

	return {
		statePlugins: {
			spec: {
				wrapActions: {
					updateJsonSpec: addExamplesToJsonSpec,
				}
			}
		}
	};

	/**
	 * Load response examples added to system by CustomExamplesLoader plugin
	 * so I don't have to put them in the JSDoc comments for the routes
	 * @param originalAction
	 * @param system
	 * @return {function(*): *}
	 */
	function addExamplesToJsonSpec(originalAction, system) {

		return async (json) => {
			// Fetch the JSON files because importing it doesn't work in this context for some reason
			// I think it has something to do with this plugin becoming part of the Swagger config object
			// and the import not being in that scope.
			// Note: There Express routes (e.g., /docs/groups.json) set up to serve the files so they can be picked up here
			const getExamples = async (filename: string) => {
				return fetch(`./${filename}`, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					}
				})
					.then(function (response) {
						return response.json();
					}).then(function (data) {
						return data;
					});
			};

			const users = await getExamples('users.json');
			const groups = await getExamples('groups.json');
			const examples = {
				users,
				groups
			};
			if (examples) {
				// Run my customisation function
				updateExamples(json, examples);

				// Trigger the SwaggerUI function
				originalAction(json);
			}

			return originalAction(json);
		};

		function updateExamples(json, examples) {
			// Match examples to paths
			json['paths']['/user']['get']['responses']['200']['content']['application/json']['examples'] = {
				'example1': {
					'summary': 'Sample User',
					'value': examples.users[0]
				},
			};

			// Importing the common functions doesn't work here :(
			const user = examples.users[6];
			const userGroups = user.groupIds.map(groupId => examples.groups.find((group: Group) => group.id === groupId));
			json['paths']['/groups']['get']['responses']['200']['content']['application/json']['examples'] = {
				'example1': {
					'summary': 'User Groups',
					'value': userGroups
				},
			};

		}
	}
};

export default CustomActionsPlugin;
