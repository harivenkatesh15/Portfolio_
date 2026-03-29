import * as THREE from 'three';
import { useRef, useState, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  Text,
  RoundedBox,
  MeshTransmissionMaterial,
  Environment,
  Float
} from '@react-three/drei';

export default function FluidGlassNavbar({ 
  items = [
    { label: 'Home', link: '/' },
    { label: 'Work', link: '/work' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' }
  ] 
}) {
  return (
    <div style={{ width: '100%', height: '200px', position: 'fixed', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }}>
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 15], fov: 25 }}>
        {/* Ambient lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        
        {/* Environment for shiny reflections on the glass */}
        <Environment preset="city" />

        {/* backgroundContent:
           This is just to show the refraction. 
           In a real app, this would be your main 3D scene content.
        */}
        <BackgroundBlobs />

        <NavbarContent items={items} />
      </Canvas>
    </div>
  );
}

function NavbarContent({ items }) {
  const buffer = useFBO();
  const { viewport, gl, scene, camera } = useThree();
  const [glassScene] = useState(() => new THREE.Scene());

  // Refs
  const barRef = useRef();
  const groupRef = useRef();

  useFrame(() => {
    // 1. Render the main scene (background blobs) into the FBO buffer
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    
    // 2. Reset render target to screen
    gl.setRenderTarget(null);
  });

  // Responsive sizing
  const width = Math.min(viewport.width * 0.8, 12); 

  return (
    <>
      {/* We use createPortal to render the Glass Bar into a separate scene 
        so it doesn't get captured by its own FBO buffer (which causes visual glitches)
        OR we render it last on top of the buffer. 
        
        Here we simply place it in the main scene but utilize the buffer we just created.
      */}
      
      <group ref={groupRef} position={[0, viewport.height / 2 - 1.5, 0]}> 
        {/* Floating Animation */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            
            {/* The Glass Bar */}
            <RoundedBox args={[width, 1.5, 0.5]} radius={0.25} smoothness={4} ref={barRef} >
              <MeshTransmissionMaterial
                buffer={buffer.texture}
                ior={1.2}
                thickness={1.5}
                anisotropy={0.2}
                chromaticAberration={0.05}
                roughness={0.1}
                toneMapped={true}
              />
            </RoundedBox>

            {/* Navigation Text Items */}
            <NavItems items={items} width={width} />
            
        </Float>
      </group>
    </>
  );
}

function NavItems({ items, width }) {
  const { viewport } = useThree();
  // Calculate spacing based on the bar width
  const spacing = width / (items.length + 1);

  const handleLink = (link) => {
    window.location.href = link;
  };

  return (
    <group position={[0, 0, 0.3]}> {/* Slightly in front of glass */}
      {items.map((item, i) => (
        <NavItem 
          key={i} 
          item={item} 
          position={[(i - (items.length - 1) / 2) * spacing * 0.8, 0, 0]} 
          onClick={() => handleLink(item.link)}
        />
      ))}
    </group>
  );
}

function NavItem({ item, position, onClick }) {
  const [hovered, setHover] = useState(false);
  
  // Change cursor on hover
  useFrame(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  });

  return (
    <Text
      position={position}
      fontSize={0.25}
      color={hovered ? "#ffffff" : "#eeeeee"}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click through
        onClick();
      }}
      // Make the text interaction work even though canvas has pointerEvents: none
      // We need to re-enable pointer events on the parent div via CSS for this to work perfectly,
      // Or set the canvas pointerEvents to 'auto' but ensure it doesn't block page scrolling.
    >
      {item.label}
    </Text>
  );
}

// --- Demo Background to show Refraction ---
function BackgroundBlobs() {
  return (
    <group position={[0, 0, -5]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[4, -2, -2]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[0, 0, -2]}>
          <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Float>
    </group>
  );
}