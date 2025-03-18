const FormFieldFactory = {
  createField(config) {
    switch (config.type) {
      case 'text':
        return (
          <input
            key={config.name}
            type={config.type}
            placeholder={config.label}
            name={config.name}
          />
        );

      case 'select':
        return (
          <select key={config.name} name={config.name}>
            {config.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label key={config.name}>
            <input type="checkbox" name={config.name} />
            {config.label}
          </label>
        );

      default:
        return null;
    }
  },
};

export { FormFieldFactory };
