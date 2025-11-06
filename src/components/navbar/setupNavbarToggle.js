export const setupNavbarToggle = () => {
  // 1. Obtener los elementos del DOM
  const menuToggleOpen = document.getElementById("toggleOpen");
  const menuToggleClose = document.getElementById("toggleClose");
  const collapseMenu = document.getElementById("collapseMenu");

  // 2. Verificar que todos los elementos existan antes de añadir listeners
  if (menuToggleOpen && menuToggleClose && collapseMenu) {
    // 3. Función para abrir el menú
    const openMenu = () => {
      collapseMenu.classList.remove('max-lg:hidden'); 
    };

    // 4. Función para cerrar el menú
    const closeMenu = () => {
      collapseMenu.classList.add('max-lg:hidden');
    };

    // 5. Asignar los listeners de eventos
    menuToggleOpen.addEventListener("click", openMenu);
    menuToggleClose.addEventListener("click", closeMenu);

    // 6. Limpieza (Cleanup) para evitar memory leaks en React
    return () => {
      menuToggleOpen.removeEventListener("click", openMenu);
      menuToggleClose.removeEventListener("click", closeMenu);
    };
  }
};