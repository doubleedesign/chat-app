import { Group } from '../types.ts';

/**
 * Note: To check which actions are actually running
 * and thus can be overridden here, use Redux DevTools in the browser
 * @ref https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/plugin-api.md
 * @ref https://github.com/swagger-api/swagger-ui/blob/master/src/plugins/add-plugin.md
 */
export const CustomActionsPlugin = function(system) {

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
     *
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
			json.paths['/user'] = {
				...json.paths['/user'],
				post: {
					...json.paths['/user'].post,
					parameters: json.paths['/user'].post.parameters.map(param => {
						if(param.name === 'body') {
							return {
								...param,
								schema: {
									type: param.schema['$ref'].replace('#/components/schemas/', ''),
									default: examples.users[7]
								}
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/user'].post.responses,
						201: {
							...json.paths['/user'].post.responses['201'],
							content: {
								'application/json': {
									...json.paths['/user'].post.responses['201'].content['application/json'],
									examples: {
										example1: {
											value: examples.users[7]
										}
									},
									schema: json.components.schemas.User
								}
							}
						},
					}
				}
			};

			json.paths['/user/:userId'] = {
				...json.paths['/user/:userId'],
				get: {
					...json.paths['/user/:userId'].get,
					parameters: json.paths['/user/:userId'].get.parameters.map(param => {
						if(param.name === 'userId') {
							return {
								...param,
								schema: { ...param.schema, default: examples.users[0].email }
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/user/:userId'].get.responses,
						200: {
							...json.paths['/user/:userId'].get.responses['200'],
							content: {
								'application/json': {
									...json.paths['/user/:userId'].get.responses['200'].content['application/json'],
									examples: {
										example1: {
											value: examples.users[0]
										}
									},
									schema: json.components.schemas.User
								}
							}
						},
					}
				},
			};

			json.paths['/user/:userId/groups'] = {
				...json.paths['/user/:userId/groups'],
				get: {
					...json.paths['/user/:userId/groups'].get,
					parameters: json.paths['/user/:userId/groups'].get.parameters.map(param => {
						if(param.name === 'userId') {
							return {
								...param,
								schema: { ...param.schema, default: examples.users[17].email }
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/user/:userId/groups'].get.responses,
						200: {
							...json.paths['/user/:userId/groups'].get.responses['200'],
							content: {
								'application/json': {
									...json.paths['/user/:userId/groups'].get.responses['200'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups.filter((group: Group) => examples.users[17].groupIds.includes(group.id))
										}
									},
									schema: json.components.schemas.Group
								}
							}
						},
					}
				},
			};

			json.paths['/groups'] = {
				...json.paths['/groups'],
				post: {
					...json.paths['/groups'].post,
					parameters: json.paths['/groups'].post.parameters.map(param => {
						if(param.name === 'body') {
							return {
								...param,
								schema: {
									type: param.schema['$ref'].replace('#/components/schemas/', ''),
									default: examples.groups[5]
								}
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/groups'].post.responses,
						201: {
							...json.paths['/groups'].post.responses['201'],
							content: {
								'application/json': {
									...json.paths['/groups'].post.responses['201'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups[5]
										}
									},
									schema: json.components.schemas.Group
								}
							}
						},
					}
				}
			};

			json.paths['/groups/:groupId'] = {
				...json.paths['/groups/:groupId'],
				get: {
					...json.paths['/groups/:groupId'].get,
					parameters: json.paths['/groups/:groupId'].get.parameters.map(param => {
						if(param.name === 'groupId') {
							return {
								...param,
								schema: { ...param.schema, default: 'rik1lvWY0O2w' }
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/groups/:groupId'].get.responses,
						200: {
							...json.paths['/groups/:groupId'].get.responses['200'],
							content: {
								'application/json': {
									...json.paths['/groups/:groupId'].get.responses['200'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups.find((group: Group) => group.label === 'Software Developers')
										}
									},
									schema: json.components.schemas.Group
								}
							}
						},
					}
				},
				patch: {
					...json.paths['/groups/:groupId'].patch,
					parameters: json.paths['/groups/:groupId'].patch.parameters.map(param => {
						if(param.name === 'groupId') {
							return {
								...param,
								schema: { ...param.schema, default: 'Ef8JuR1wdy7I' }
							};
						}
						if(param.name === 'body') {
							return {
								...param,
								schema: {
									type: param.schema['$ref'].replace('#/components/schemas/', ''),
									default: examples.groups[6]
								}
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/groups/:groupId'].patch.responses,
						201: {
							...json.paths['/groups/:groupId'].patch.responses['201'],
							content: {
								'application/json': {
									...json.paths['/groups/:groupId'].patch.responses['201'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups[14]
										}
									},
									schema: json.components.schemas.Group
								}
							}
						},
					}
				},
			};

			json.paths['/channels'] = {
				...json.paths['/channels'],
				post: {
					...json.paths['/channels'].post,
					parameters: json.paths['/channels'].post.parameters.map(param => {
						if(param.name === 'body') {
							return {
								...param,
								schema: {
									...param.schema,
									default: {
										groupId: examples.groups[5].id,
										channel: examples.groups[5].channels[0]
									}
								}
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/channels'].post.responses,
						201: {
							...json.paths['/channels'].post.responses['201'],
							content: {
								'application/json': {
									...json.paths['/channels'].post.responses['201'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups[5].channels[0]
										}
									},
									schema: json.components.schemas.Channel
								}
							}
						},
					}
				}
			};

			json.paths['/channels/:channelId'] = {
				...json.paths['/channels/:channelId'],
				get: {
					...json.paths['/channels/:channelId'].get,
					parameters: json.paths['/channels/:channelId'].get.parameters.map(param => {
						if(param.name === 'channelId') {
							return {
								...param,
								schema: { ...param.schema, default: 'nwknq8JR3mMq901d' }
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/channels/:channelId'].get.responses,
						200: {
							...json.paths['/channels/:channelId'].get.responses['200'],
							content: {
								'application/json': {
									...json.paths['/channels/:channelId'].get.responses['200'].content['application/json'],
									examples: {
										example1: {
											value: examples.groups[4].channels.find((channel) => channel.id === 'nwknq8JR3mMq901d')
										}
									},
									schema: json.components.schemas.Channel
								}
							}
						},
					}
				},
				delete: {
					...json.paths['/channels/:channelId'].delete,
					parameters: json.paths['/channels/:channelId'].delete.parameters.map(param => {
						if(param.name === 'channelId') {
							return {
								...param,
								schema: { ...param.schema, default: 'nwknq8JR3mMq901d' }
							};
						}

						return param;
					}),
					responses: {
						...json.paths['/channels/:channelId'].delete.responses,
						204: {
							...json.paths['/channels/:channelId'].delete.responses['204'],
							content: {
								'application/json': {
									examples: {
										example1: {
											value: {
												...examples.groups[4],
												channels: examples.groups[4].channels.filter((channel) => channel.id !== 'nwknq8JR3mMq901d')
											}
										}
									},
									schema: json.components.schemas.Group
								}
							}
						},
					}
				}
			};
		}
	}
};