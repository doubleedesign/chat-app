export const CustomComponentOverridePlugin = () => {

	return {
		wrapComponents: {
			JsonSchemaForm: (Original, { React }) => (props) => {
				const customObjectType = props.schema._root.entries[0].some(entry => ['User', 'Group', 'Channel'].includes(entry));

				// Check if the type means it should be overridden to a textarea
				if(customObjectType) {
					// Override the Map field with type
					const hackedFieldSchema = props.schema.set('type', 'object');

					return (
						<Original {...props} schema={hackedFieldSchema} />
					);
				}


				// Default behavior if no override condition met
				return <Original {...props} />;
			}
		}
	};
};