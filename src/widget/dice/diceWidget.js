import React, { useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useSetRecoilState } from 'recoil'
import { Box } from '@mui/material'
import DiceBox from './components/diceModel'
import Borders from './components/border'
import { useDiceRoll } from './globalState/states'

export default function Dice({ id }) {
  const setRoll = useSetRecoilState(useDiceRoll(id))

  // to use recoil state inside <Canvas>
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

  const onWidgetClick = useCallback(() => {
    setRoll(true)
  }, [setRoll])

  return (
    <Box onClick={onWidgetClick} sx={{ height: '100%' }}>
      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{
          position: [0, 12, 7],
          rotation: [-Math.PI / 3, 0, 0],
          fov: 50,
          near: 1,
          far: 100,
        }}
        style={{ height: '100%' }}
      >
        <RecoilBridge>
          <color attach='background' args={['#333333']} />
          <ambientLight intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Physics
            gravity={[0, -50, 0]}
            defaultContactMaterial={{ restitution: 0.5, friction: 0.05 }}
            size={8}
          >
            <group position={[0, 0, -10]}>
              <Borders />
              <DiceBox widgetIndex={id} />
            </group>
          </Physics>
        </RecoilBridge>
      </Canvas>
    </Box>
  )
}
