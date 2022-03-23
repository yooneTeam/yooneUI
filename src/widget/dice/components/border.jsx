import { usePlane } from '@react-three/cannon'

export default function Borders() {
  return (
    <>
      <Plane position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props, friction: 0.1 }))
  return null
}
