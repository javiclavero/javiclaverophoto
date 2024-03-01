import { useEffect, useState } from "react";
import Menu from "../components/Menu"; // Ajusta la ruta de importación según la estructura de tu proyecto
import ContentDisplay from "../components/ContentDisplay";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [contentPath, setContentPath] = useState("");
  const [content, setContent] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isDesaturatedDarkened, setIsDesaturatedDarkened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const loadContent = async (path: string): Promise<void> => {
    
    try {
      const response = await fetch(path);
      const htmlContent = await response.text();
      setContent(htmlContent);
      setIsDesaturatedDarkened(true); 
    } catch (error) {
      console.error('Error loading the content:', error);
      setContent('<p>Error al cargar el contenido.</p>');
    }
    setIsContentVisible(true);
  };

  const clearContent = () => {
    setTimeout(() => setIsContentVisible(false), 300); // Espera 300ms para ocultar el div, ajusta según la duración de la transición.
    setContent(''); // Esto vacía la cadena de contenido.
    setIsDesaturatedDarkened(false); 
  };
  const images = [
    "/backgrounds/bg1.jpg",
    "/backgrounds/bg2.jpg",
    "/backgrounds/bg3.jpg",
    "/backgrounds/bg4.jpg",
    "/backgrounds/bg5.jpg",
  ];

  const menuItems = [
    {
      title: "Viajes",
      subMenu: [
        { title: "Highlands", contentPath: "content/11/_11.html" },
        { title: "Algarve", contentPath: "content/12/_12.html" },
        { title: "Vietnam", contentPath: "content/13/_13.html" },
      ],
    },
    {
      title: "Astrofotografía",
      subMenu: [
        { title: "Vía Láctea", contentPath: "content/21/_21.html" },
        { title: "Constelaciones", contentPath: "content/22/_22.html" },
      ],
    },
    // Y así sucesivamente para los demás menús
  ];

  useEffect(() => {
    if (!isDesaturatedDarkened) {
    const changeImage = () => {
 
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);

      }, 500); // Espera a que termine la transición de opacidad antes de cambiar la imagen
   
    };

    const intervalId = setInterval(changeImage, 10500);
    return () => clearInterval(intervalId);
  }
   

  }, [images.length, isDesaturatedDarkened]);

  return (
    <>
    <div className={`backgroundContainer ${isDesaturatedDarkened ? 'desaturatedDarkened' : ''}`}>
      {images.map((image, index) => (
        <div
          key={image}
          className="backgroundImage"
          style={{
            backgroundImage: `url(${image})`,
            filter: 'saturate(75%)',
            opacity: index === currentImageIndex ? (fade ? "1" : "0") : "0",
          }}
        />
      ))}
</div>
  <div className="mainContainer">
      <div className="menuContainer">
        <h1 className="logoContainer" onClick={clearContent}>
          <span className="javi">javi</span>.
          <span className="clavero">clavero</span>
        </h1>
        <Menu items={menuItems} onSubMenuClick={loadContent} />
        {/* Contenedor de íconos de redes sociales */}
        <div className="socialIconsContainer">
          <a
            href="https://instagram.com/javi.clavero"
            className="socialIcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100069718520564"
            className="socialIcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com/javiclavero76"
            className="socialIcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://www.google.es/maps/contrib/100590359542707483881/photos/@39.3447307,-6.1626025,5z/data=!4m3!8m2!3m1!1e1"
            className="socialIcon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-google"></i>
          </a>
        </div>
        {/* Texto de copyright */}
        <div className="copyright"
     onMouseEnter={() => setShowTooltip(true)}
     onMouseLeave={() => setShowTooltip(false)}>
  &copy; 2024 javi.clavero
  {showTooltip && (
    <span className="tooltip">Sitio creado con ReactJS
      <i className="fa-brands fa-react"></i>
      {/* Asegúrate de incluir aquí también el icono de Next.js si es necesario */}
    </span>
  )}
</div></div>


     <ContentDisplay content={content} isContentVisible={isContentVisible}/>
    </div>
    </>
  );
}
