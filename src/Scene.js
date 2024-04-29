/* eslint-disable react/jsx-no-comment-textnodes */
import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import React, { useRef } from "react";


const Scene = () => {

  const meshRef = useRef(); // Referência à malha para atualizar a rotação


  // Cube 
  const { position, color, wireframe, scale } = useControls("cube",{
    position: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      min: -10,
      max: 10,
      step: 0.01,
    },
    color: "#ffffff",
    wireframe: false,
    // click:button(() => {
    //   console.log("clicked");
    // }),
    scale: {options: [1,2,3]}

  });
  console.log(position);

  

  // Sphere
  const { colorSphere , wireframeR } = useControls("sphere", {

    
    colorSphere: "skyblue",
    wireframeR: true,
  });

  // Função para animar a rotação 
  const animate = () => {
    if(meshRef.current) {
      // Atualiza a rotação da malha
      meshRef.current.rotation.z += 0.01;
    }

     // Solicita a próxima animação
    requestAnimationFrame(animate);
  };

  // Inicia a animação quando o componente é montado
  React.useEffect(() => {
    animate();
  }, []); // Executa apenas uma vez após a montagem do componente

  return (
    <>
      <OrbitControls />

      <ambientLight />
      <directionalLight position={[0, 0, 0]} />

      // Cube

      <mesh position={[position.x, position.y, position.z]} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={color} wireframe={wireframe}  />
      </mesh>

      
      // Sphere
      
      <mesh position={[3, 0, 0]} ref={meshRef}>
        <sphereGeometry />
        <meshBasicMaterial 
        color={colorSphere} wireframe={wireframeR}
        />
      </mesh>
    </>
  );
};

export default Scene;
