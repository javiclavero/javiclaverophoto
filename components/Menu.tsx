import React, { useState } from 'react';
import '../styles/Menu.css'; // Asegúrate de tener este archivo CSS en la misma carpeta

interface SubMenuItem {
    title: string;
    contentPath: string; // Añadimos esta propiedad para identificar el path del contenido
  }
  
  interface MenuItem {
    title: string;
    subMenu: SubMenuItem[]; // Usamos la nueva interfaz SubMenuItem
  }
  
  interface MenuProps {
    items: MenuItem[];
    onSubMenuClick: (contentPath: string) => void; // Esta función actualizará contentPath en el componente padre
  }
  

const Menu: React.FC<MenuProps> = ({ items,  onSubMenuClick}) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    if (activeMenu === index) {
      setActiveMenu(null); // Cierra el submenú si ya está abierto
    } else {
      setActiveMenu(index);
    }
  };

  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="menuItem">
          <div className="menuLink" onClick={() => toggleSubMenu(index)}>{item.title}</div>
          <div
        className={`subMenuContainer ${activeMenu === index ? 'active' : ''}`}
        style={{
          // Calcula la altura máxima para la animación
          maxHeight: activeMenu === index ? `${item.subMenu.length * 2.5}rem` : '0',
        }}
      >
            {item.subMenu.map((subItem, subIndex) => (
              <div
                key={subIndex} className="subMenuItem"
                onClick={() => onSubMenuClick(subItem.contentPath)} // Actualiza contentPath en el componente padre
              >
                {subItem.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Menu;

