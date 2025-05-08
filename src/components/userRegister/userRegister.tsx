const UserRegister = () => {
  return (
    <form>
      <h2>Crear Usuario</h2>

      <label>
        Nombre de Usuario:
        <input type="text" name="userName" required />
      </label>

      <label>
        Correo Electrónico:
        <input type="email" name="email" required />
      </label>

      <label>
        Contraseña:
        <input type="password" name="password" required />
      </label>

      <label>
        Rol:
        <select name="role">
          <option value="Empleado">Empleado</option>
          <option value="Gerente">Gerente</option>
          <option value="Administrador">Administrador</option>
        </select>
      </label>

      {/* Selección de Empleado */}
      <label>
        Selecciona el Empleado:
        <select name="employeeId" required>
          <option value="">Seleccione un empleado</option>
        </select>
      </label>

      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserRegister;
