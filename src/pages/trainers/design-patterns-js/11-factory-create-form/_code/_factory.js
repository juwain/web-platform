const FormFieldFactory = {
  createField(config) {
    switch (config.type) {
      case 'text':
        return (
          <input
            type={config.type}
            placeholder={config.label}
            name={config.name}
          />
        );

      case 'select':
        return (
          <>
            <label htmlFor={config.name}>{config.label} </label>
            <select name={config.name}>
              {config.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </>
        );

      case 'checkbox':
        return (
          <label>
            <input type="checkbox" name={config.name} /> {config.label}
          </label>
        );

      default:
        return null;
    }
  },
};

export { FormFieldFactory };
