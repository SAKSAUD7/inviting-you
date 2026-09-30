'use client'

import {
  useRef, useState, useEffect, useCallback, Suspense,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, Float, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { BirthdayConfig } from '@/types/wedding'

// ════════════════════════════════════════════════════════════════════════════
//  TYPES
// ════════════════════════════════════════════════════════════════════════════
type AnimState = 'idle' | 'walk' | 'run' | 'celebrate' | 'hug' | 'happy' | 'surprised' | 'point'
type GamePhase = 'INTRO' | 'PLAYING' | 'HEART_DIALOG' | 'QUESTION' | 'COMPLETING' | 'COMPLETE'

interface HeartInfo {
  id: number
  pos: [number, number, number]
  type: 'memory' | 'compliment' | 'secret' | 'question' | 'final'
}

// ════════════════════════════════════════════════════════════════════════════
//  WORLD HEART POSITIONS (3-D space)
// ════════════════════════════════════════════════════════════════════════════
const HEARTS: HeartInfo[] = [
  { id: 0, pos: [7,   1.2,  -3],  type: 'memory' },
  { id: 1, pos: [14,  1.2,   5],  type: 'compliment' },
  { id: 2, pos: [-5,  1.2,  10],  type: 'secret' },
  { id: 3, pos: [18,  1.2,  -7],  type: 'question' },
  { id: 4, pos: [24,  1.2,   1],  type: 'final' },
]

// ════════════════════════════════════════════════════════════════════════════
//  AYMAN — 3-D Chibi Character (Girl — Pink themed)
//  Closely matches the character sheet: big curly hair + bow, pink cardigan,
//  white skirt, pink chunky sneakers, heart handbag
// ════════════════════════════════════════════════════════════════════════════
function AymanBody({ state }: { state: AnimState }) {
  const lArm = useRef<THREE.Group>(null)
  const rArm = useRef<THREE.Group>(null)
  const lLeg = useRef<THREE.Group>(null)
  const rLeg = useRef<THREE.Group>(null)
  const bodyG = useRef<THREE.Group>(null)
  const headG = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // reset each frame
    ;[lArm, rArm, lLeg, rLeg].forEach(r => {
      if (r.current) { r.current.rotation.x = 0; r.current.rotation.z = 0 }
    })
    if (bodyG.current) { bodyG.current.rotation.x = 0; bodyG.current.position.y = 0 }
    if (headG.current) headG.current.rotation.z = 0

    switch (state) {
      case 'idle':
        if (headG.current) headG.current.rotation.z = Math.sin(t * 0.9) * 0.025
        if (bodyG.current) bodyG.current.position.y = Math.sin(t * 1.6) * 0.018
        break
      case 'walk': { const wt = t * 7.2
        if (lArm.current) lArm.current.rotation.x = Math.sin(wt) * 0.52
        if (rArm.current) rArm.current.rotation.x = Math.sin(wt + Math.PI) * 0.52
        if (lLeg.current) lLeg.current.rotation.x = Math.sin(wt + Math.PI) * 0.48
        if (rLeg.current) rLeg.current.rotation.x = Math.sin(wt) * 0.48
        if (bodyG.current) bodyG.current.position.y = Math.abs(Math.sin(wt)) * 0.05
        break }
      case 'run': { const rt = t * 12
        if (bodyG.current) { bodyG.current.rotation.x = -0.13; bodyG.current.position.y = Math.abs(Math.sin(rt)) * 0.1 }
        if (lArm.current) lArm.current.rotation.x = Math.sin(rt) * 0.78
        if (rArm.current) rArm.current.rotation.x = Math.sin(rt + Math.PI) * 0.78
        if (lLeg.current) lLeg.current.rotation.x = Math.sin(rt + Math.PI) * 0.72
        if (rLeg.current) rLeg.current.rotation.x = Math.sin(rt) * 0.72
        break }
      case 'celebrate': { const ct = t * 8
        if (bodyG.current) bodyG.current.position.y = Math.abs(Math.sin(ct)) * 0.32
        if (lArm.current) { lArm.current.rotation.x = -2.1 + Math.sin(ct) * 0.3; lArm.current.rotation.z = -0.3 }
        if (rArm.current) { rArm.current.rotation.x = -2.1 + Math.sin(ct + Math.PI) * 0.3; rArm.current.rotation.z = 0.3 }
        break }
      case 'happy': { const ht = t * 5
        if (bodyG.current) bodyG.current.position.y = Math.sin(ht) * 0.05
        if (lArm.current) lArm.current.rotation.x = -1.0 + Math.sin(ht) * 0.22
        if (rArm.current) rArm.current.rotation.x = -1.0 + Math.sin(ht + Math.PI) * 0.22
        break }
      case 'hug':
        if (lArm.current) { lArm.current.rotation.x = -1.25; lArm.current.rotation.z = -0.52 }
        if (rArm.current) { rArm.current.rotation.x = -1.25; rArm.current.rotation.z =  0.52 }
        break
    }
  })

  const skin = '#FDDBB4'; const darkBrown = '#2C1505'; const midBrown = '#3D1F0A'
  const pink = '#FF9EB5'; const deepPink = '#FF758C'; const white = '#F8F8FF'

  return (
    <group>
      {/* ── HAIR (back / volume) ── */}
      <mesh position={[0, 1.58, -0.07]}><sphereGeometry args={[0.48, 24, 24]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>
      {/* Side curls */}
      <mesh position={[-0.25, 1.18, -0.33]} rotation={[0.38, 0.08, 0.18]}><capsuleGeometry args={[0.105, 0.5, 8, 12]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>
      <mesh position={[ 0.22, 1.15, -0.31]} rotation={[0.36, -0.08, -0.16]}><capsuleGeometry args={[0.09, 0.45, 8, 12]} /><meshStandardMaterial color={midBrown} roughness={0.9} /></mesh>
      <mesh position={[-0.3, 0.88, -0.26]} rotation={[0.52, 0.08, 0.22]}><capsuleGeometry args={[0.082, 0.32, 8, 12]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>
      <mesh position={[ 0.27, 0.85, -0.23]} rotation={[0.5, -0.08, -0.2]}><capsuleGeometry args={[0.075, 0.3, 8, 12]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>

      {/* ── HEAD ── */}
      <group ref={headG}>
        <mesh position={[0, 1.46, 0.04]} castShadow><sphereGeometry args={[0.44, 32, 32]} /><meshStandardMaterial color={skin} roughness={0.28} metalness={0.02} /></mesh>

        {/* Hair top */}
        <mesh position={[0, 1.82, 0.15]}><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>
        <mesh position={[-0.31, 1.73, 0.1]} rotation={[0, 0, 0.32]}><capsuleGeometry args={[0.09, 0.2, 8, 12]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>
        <mesh position={[ 0.3,  1.73, 0.1]} rotation={[0, 0,-0.32]}><capsuleGeometry args={[0.09, 0.2, 8, 12]} /><meshStandardMaterial color={darkBrown} roughness={0.9} /></mesh>

        {/* ── BIG PINK BOW ── */}
        <group position={[0.36, 1.92, 0]}>
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0,  0.68]}><coneGeometry args={[0.115, 0.2, 4]} /><meshStandardMaterial color="#FF9EB5" roughness={0.3} emissive="#FF9EB5" emissiveIntensity={0.18} /></mesh>
          <mesh position={[ 0.09, 0, 0]} rotation={[0, 0, -0.68]}><coneGeometry args={[0.105, 0.18, 4]} /><meshStandardMaterial color="#FF758C" roughness={0.3} emissive="#FF758C" emissiveIntensity={0.18} /></mesh>
          <mesh><sphereGeometry args={[0.044, 12, 12]} /><meshStandardMaterial color="#E04A6C" roughness={0.4} emissive="#E04A6C" emissiveIntensity={0.1} /></mesh>
        </group>

        {/* ── EYES — Left ── */}
        <group position={[-0.158, 1.52, 0.41]}>
          <mesh><sphereGeometry args={[0.092, 16, 16]} /><meshStandardMaterial color="#1A0A02" /></mesh>
          <mesh position={[-0.024, 0.032, 0.074]}><sphereGeometry args={[0.032, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.9} /></mesh>
          <mesh position={[ 0.018,-0.01, 0.082]}><sphereGeometry args={[0.018, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.65} /></mesh>
          {/* eyelid tint */}
          <mesh position={[0, 0.055, 0.066]} rotation={[0.22, 0, 0]}><sphereGeometry args={[0.068, 8, 8]} /><meshStandardMaterial color={darkBrown} transparent opacity={0.38} /></mesh>
        </group>

        {/* ── EYES — Right ── */}
        <group position={[0.158, 1.52, 0.41]}>
          <mesh><sphereGeometry args={[0.092, 16, 16]} /><meshStandardMaterial color="#1A0A02" /></mesh>
          <mesh position={[-0.024, 0.032, 0.074]}><sphereGeometry args={[0.032, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.9} /></mesh>
          <mesh position={[ 0.018,-0.01, 0.082]}><sphereGeometry args={[0.018, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.65} /></mesh>
          <mesh position={[0, 0.055, 0.066]} rotation={[0.22, 0, 0]}><sphereGeometry args={[0.068, 8, 8]} /><meshStandardMaterial color={darkBrown} transparent opacity={0.38} /></mesh>
        </group>

        {/* Rosy cheeks */}
        <mesh position={[-0.285, 1.41, 0.37]}><sphereGeometry args={[0.074, 8, 8]} /><meshStandardMaterial color="#FFB3C1" transparent opacity={0.55} roughness={1} /></mesh>
        <mesh position={[ 0.285, 1.41, 0.37]}><sphereGeometry args={[0.074, 8, 8]} /><meshStandardMaterial color="#FFB3C1" transparent opacity={0.55} roughness={1} /></mesh>

        {/* Nose */}
        <mesh position={[0, 1.41, 0.465]}><sphereGeometry args={[0.023, 8, 8]} /><meshStandardMaterial color="#F4A680" transparent opacity={0.48} /></mesh>

        {/* Mouth smile */}
        <mesh position={[0, 1.33, 0.445]} scale={[1.2, 0.55, 0.55]}>
          <torusGeometry args={[0.058, 0.017, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#E05070" roughness={0.5} />
        </mesh>
      </group>

      {/* ── NECK ── */}
      <mesh position={[0, 1.07, 0.04]}><cylinderGeometry args={[0.1, 0.12, 0.14, 12]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>

      {/* ── BODY ── */}
      <group ref={bodyG}>
        {/* Pink cardigan/jacket body */}
        <mesh position={[0, 0.75, 0]} castShadow><capsuleGeometry args={[0.27, 0.36, 8, 16]} /><meshStandardMaterial color={pink} roughness={0.55} /></mesh>
        {/* Collar lapels */}
        <mesh position={[0, 0.97, 0.12]} rotation={[0.1, 0, 0]}><torusGeometry args={[0.16, 0.042, 8, 24, Math.PI * 0.7]} /><meshStandardMaterial color={deepPink} roughness={0.5} /></mesh>
        {/* Inner white shirt visible */}
        <mesh position={[0, 0.88, 0.22]} rotation={[-0.05, 0, 0]}><planeGeometry args={[0.18, 0.14]} /><meshStandardMaterial color="#FFF5F8" roughness={0.6} /></mesh>

        {/* White pleated skirt */}
        <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.38, 0.32, 32, 1, true]} /><meshStandardMaterial color={white} roughness={0.5} side={THREE.DoubleSide} /></mesh>
        <mesh position={[0, 0.34, 0]}><cylinderGeometry args={[0.38, 0.36, 0.03, 32]} /><meshStandardMaterial color="#EEEEFF" roughness={0.5} /></mesh>

        {/* ── LEFT ARM ── */}
        <group ref={lArm} position={[-0.315, 0.88, 0]}>
          <mesh position={[0, -0.17, 0]}><capsuleGeometry args={[0.073, 0.27, 4, 8]} /><meshStandardMaterial color={pink} roughness={0.55} /></mesh>
          <mesh position={[0, -0.36, 0]}><sphereGeometry args={[0.073, 8, 8]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>
        </group>
        {/* ── RIGHT ARM ── */}
        <group ref={rArm} position={[0.315, 0.88, 0]}>
          <mesh position={[0, -0.17, 0]}><capsuleGeometry args={[0.073, 0.27, 4, 8]} /><meshStandardMaterial color={pink} roughness={0.55} /></mesh>
          <mesh position={[0, -0.36, 0]}><sphereGeometry args={[0.073, 8, 8]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>
          {/* Pink heart handbag */}
          <group position={[0.12, -0.38, 0.07]}>
            <mesh><boxGeometry args={[0.11, 0.09, 0.06]} /><meshStandardMaterial color={deepPink} roughness={0.35} emissive={deepPink} emissiveIntensity={0.06} /></mesh>
            <mesh position={[0, 0.006, 0.033]}><sphereGeometry args={[0.019, 6, 6]} /><meshStandardMaterial color="#FFB3C1" emissive="#FFB3C1" emissiveIntensity={0.35} /></mesh>
          </group>
        </group>

        {/* ── LEFT LEG ── */}
        <group ref={lLeg} position={[-0.14, 0.37, 0]}>
          <mesh position={[0,-0.12, 0]}><capsuleGeometry args={[0.077, 0.17, 4, 8]} /><meshStandardMaterial color={skin} roughness={0.35} /></mesh>
          <mesh position={[0,-0.32, 0]}><capsuleGeometry args={[0.073, 0.13, 4, 8]} /><meshStandardMaterial color="#FFFFFF" roughness={0.5} /></mesh>
          {/* Pink chunky shoe */}
          <mesh position={[0.01,-0.47, 0.03]}><boxGeometry args={[0.155, 0.1, 0.24]} /><meshStandardMaterial color={deepPink} roughness={0.35} /></mesh>
          <mesh position={[-0.065,-0.47,-0.075]}><boxGeometry args={[0.024, 0.1, 0.09]} /><meshStandardMaterial color={skin} roughness={0.4} /></mesh>
        </group>
        {/* ── RIGHT LEG ── */}
        <group ref={rLeg} position={[0.14, 0.37, 0]}>
          <mesh position={[0,-0.12, 0]}><capsuleGeometry args={[0.077, 0.17, 4, 8]} /><meshStandardMaterial color={skin} roughness={0.35} /></mesh>
          <mesh position={[0,-0.32, 0]}><capsuleGeometry args={[0.073, 0.13, 4, 8]} /><meshStandardMaterial color="#FFFFFF" roughness={0.5} /></mesh>
          <mesh position={[0.01,-0.47, 0.03]}><boxGeometry args={[0.155, 0.1, 0.24]} /><meshStandardMaterial color={deepPink} roughness={0.35} /></mesh>
          <mesh position={[0.065,-0.47,-0.075]}><boxGeometry args={[0.024, 0.1, 0.09]} /><meshStandardMaterial color={skin} roughness={0.4} /></mesh>
        </group>
      </group>
    </group>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  SAUD — 3-D Chibi Character (Boy — Cream hoodie, dark jeans, backpack)
// ════════════════════════════════════════════════════════════════════════════
function SaudBody({ state }: { state: AnimState }) {
  const lArm = useRef<THREE.Group>(null)
  const rArm = useRef<THREE.Group>(null)
  const lLeg = useRef<THREE.Group>(null)
  const rLeg = useRef<THREE.Group>(null)
  const bodyG = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + 0.5
    ;[lArm, rArm, lLeg, rLeg].forEach(r => { if (r.current) { r.current.rotation.x = 0; r.current.rotation.z = 0 } })
    if (bodyG.current) { bodyG.current.rotation.x = 0; bodyG.current.position.y = 0 }

    switch (state) {
      case 'idle': if (bodyG.current) bodyG.current.position.y = Math.sin(t * 1.5) * 0.015; break
      case 'walk': { const wt = t * 7.2
        if (lArm.current) lArm.current.rotation.x = Math.sin(wt) * 0.48
        if (rArm.current) rArm.current.rotation.x = Math.sin(wt + Math.PI) * 0.48
        if (lLeg.current) lLeg.current.rotation.x = Math.sin(wt + Math.PI) * 0.44
        if (rLeg.current) rLeg.current.rotation.x = Math.sin(wt) * 0.44
        if (bodyG.current) bodyG.current.position.y = Math.abs(Math.sin(wt)) * 0.042; break }
      case 'run': { const rt = t * 12
        if (bodyG.current) { bodyG.current.rotation.x = -0.11; bodyG.current.position.y = Math.abs(Math.sin(rt)) * 0.085 }
        if (lArm.current) lArm.current.rotation.x = Math.sin(rt) * 0.73
        if (rArm.current) rArm.current.rotation.x = Math.sin(rt + Math.PI) * 0.73
        if (lLeg.current) lLeg.current.rotation.x = Math.sin(rt + Math.PI) * 0.67
        if (rLeg.current) rLeg.current.rotation.x = Math.sin(rt) * 0.67; break }
      case 'celebrate': { const ct = t * 7.5
        if (bodyG.current) bodyG.current.position.y = Math.abs(Math.sin(ct)) * 0.28
        if (lArm.current) { lArm.current.rotation.x = -1.9 + Math.sin(ct) * 0.3; lArm.current.rotation.z = -0.28 }
        if (rArm.current) { rArm.current.rotation.x = -1.9 + Math.sin(ct + Math.PI) * 0.3; rArm.current.rotation.z = 0.28 }; break }
      case 'happy': { const ht = t * 4.5
        if (bodyG.current) bodyG.current.position.y = Math.sin(ht) * 0.04
        if (lArm.current) lArm.current.rotation.x = -0.9 + Math.sin(ht) * 0.2
        if (rArm.current) rArm.current.rotation.x = -0.9 + Math.sin(ht + Math.PI) * 0.2; break }
      case 'hug':
        if (lArm.current) { lArm.current.rotation.x = -1.1; lArm.current.rotation.z = -0.58 }
        if (rArm.current) { rArm.current.rotation.x = -1.1; rArm.current.rotation.z =  0.58 }; break
    }
  })

  const skin = '#FDDBB4'

  return (
    <group>
      {/* ── HAIR (dark wavy) ── */}
      <mesh position={[0, 1.6, -0.05]}><sphereGeometry args={[0.45, 24, 24]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>
      <mesh position={[-0.29, 1.55, 0.02]} rotation={[0, 0, 0.22]}><sphereGeometry args={[0.21, 16, 16]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>
      <mesh position={[ 0.29, 1.55, 0.02]} rotation={[0, 0,-0.22]}><sphereGeometry args={[0.21, 16, 16]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>
      {/* Front waves */}
      <mesh position={[0, 1.79, 0.2]}><sphereGeometry args={[0.26, 16, 16]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>
      <mesh position={[-0.19, 1.7, 0.29]} rotation={[0.38, 0.08, 0.16]}><capsuleGeometry args={[0.08, 0.2, 6, 10]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>
      <mesh position={[ 0.19, 1.7, 0.29]} rotation={[0.38,-0.08,-0.16]}><capsuleGeometry args={[0.08, 0.2, 6, 10]} /><meshStandardMaterial color="#1A0805" roughness={0.92} /></mesh>

      {/* ── HEAD ── */}
      <mesh position={[0, 1.46, 0.04]} castShadow><sphereGeometry args={[0.42, 32, 32]} /><meshStandardMaterial color={skin} roughness={0.28} metalness={0.02} /></mesh>

      {/* Eyes — Left */}
      <group position={[-0.15, 1.5, 0.41]}>
        <mesh><sphereGeometry args={[0.082, 16, 16]} /><meshStandardMaterial color="#1A0A02" /></mesh>
        <mesh position={[-0.022, 0.026, 0.066]}><sphereGeometry args={[0.029, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.82} /></mesh>
        <mesh position={[ 0.016,-0.01, 0.075]}><sphereGeometry args={[0.016, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} /></mesh>
      </group>
      {/* Eyes — Right */}
      <group position={[0.15, 1.5, 0.41]}>
        <mesh><sphereGeometry args={[0.082, 16, 16]} /><meshStandardMaterial color="#1A0A02" /></mesh>
        <mesh position={[-0.022, 0.026, 0.066]}><sphereGeometry args={[0.029, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.82} /></mesh>
        <mesh position={[ 0.016,-0.01, 0.075]}><sphereGeometry args={[0.016, 8, 8]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} /></mesh>
      </group>

      {/* Rosy cheeks */}
      <mesh position={[-0.26, 1.41, 0.37]}><sphereGeometry args={[0.065, 8, 8]} /><meshStandardMaterial color="#FFB3C1" transparent opacity={0.5} roughness={1} /></mesh>
      <mesh position={[ 0.26, 1.41, 0.37]}><sphereGeometry args={[0.065, 8, 8]} /><meshStandardMaterial color="#FFB3C1" transparent opacity={0.5} roughness={1} /></mesh>

      {/* Nose */}
      <mesh position={[0, 1.41, 0.445]}><sphereGeometry args={[0.021, 8, 8]} /><meshStandardMaterial color="#F4A680" transparent opacity={0.45} /></mesh>

      {/* Smile */}
      <mesh position={[0, 1.33, 0.43]} scale={[1.1, 0.5, 0.5]}>
        <torusGeometry args={[0.054, 0.016, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#C0605A" roughness={0.5} />
      </mesh>

      {/* ── NECK ── */}
      <mesh position={[0, 1.08, 0.03]}><cylinderGeometry args={[0.1, 0.12, 0.13, 12]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>

      {/* ── BODY ── */}
      <group ref={bodyG}>
        {/* Cream hoodie */}
        <mesh position={[0, 0.74, 0]} castShadow><capsuleGeometry args={[0.29, 0.38, 8, 16]} /><meshStandardMaterial color="#F5F0EB" roughness={0.6} /></mesh>
        {/* Hoodie collar */}
        <mesh position={[0, 0.97, 0.06]}><torusGeometry args={[0.16, 0.045, 8, 24, Math.PI * 0.75]} /><meshStandardMaterial color="#E8E2DC" roughness={0.6} /></mesh>
        {/* Pink M logo */}
        <mesh position={[0, 0.74, 0.29]} rotation={[0, 0, 0]}><planeGeometry args={[0.13, 0.11]} /><meshStandardMaterial color="#FF9EB5" transparent opacity={0.85} roughness={0.5} /></mesh>
        {/* Front pocket */}
        <mesh position={[0, 0.57, 0.28]}><planeGeometry args={[0.31, 0.13]} /><meshStandardMaterial color="#EDE8E2" roughness={0.65} /></mesh>

        {/* Dark jeans (two leg capsules for hip area) */}
        <mesh position={[-0.13, 0.32, 0]}><capsuleGeometry args={[0.087, 0.27, 4, 8]} /><meshStandardMaterial color="#2C3E50" roughness={0.65} /></mesh>
        <mesh position={[ 0.13, 0.32, 0]}><capsuleGeometry args={[0.087, 0.27, 4, 8]} /><meshStandardMaterial color="#2C3E50" roughness={0.65} /></mesh>

        {/* Backpack */}
        <group position={[-0.01, 0.74, -0.34]}>
          <mesh><boxGeometry args={[0.3, 0.38, 0.14]} /><meshStandardMaterial color="#252525" roughness={0.72} /></mesh>
          <mesh position={[0, 0.06, 0.09]}><boxGeometry args={[0.22, 0.24, 0.03]} /><meshStandardMaterial color="#303030" roughness={0.7} /></mesh>
          <mesh position={[-0.14,-0.04, 0.3]} rotation={[0, 0, 0.1]}><boxGeometry args={[0.04, 0.48, 0.03]} /><meshStandardMaterial color="#252525" roughness={0.72} /></mesh>
          <mesh position={[ 0.14,-0.04, 0.3]} rotation={[0, 0,-0.1]}><boxGeometry args={[0.04, 0.48, 0.03]} /><meshStandardMaterial color="#252525" roughness={0.72} /></mesh>
        </group>

        {/* LEFT ARM */}
        <group ref={lArm} position={[-0.335, 0.87, 0]}>
          <mesh position={[0,-0.18, 0]}><capsuleGeometry args={[0.078, 0.29, 4, 8]} /><meshStandardMaterial color="#F5F0EB" roughness={0.6} /></mesh>
          <mesh position={[0,-0.38, 0]}><sphereGeometry args={[0.076, 8, 8]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>
        </group>
        {/* RIGHT ARM */}
        <group ref={rArm} position={[0.335, 0.87, 0]}>
          <mesh position={[0,-0.18, 0]}><capsuleGeometry args={[0.078, 0.29, 4, 8]} /><meshStandardMaterial color="#F5F0EB" roughness={0.6} /></mesh>
          <mesh position={[0,-0.38, 0]}><sphereGeometry args={[0.076, 8, 8]} /><meshStandardMaterial color={skin} roughness={0.28} /></mesh>
        </group>

        {/* LEFT LEG */}
        <group ref={lLeg} position={[-0.13, 0.37, 0]}>
          <mesh position={[0,-0.13, 0]}><capsuleGeometry args={[0.084, 0.22, 4, 8]} /><meshStandardMaterial color="#2C3E50" roughness={0.65} /></mesh>
          {/* White shoe with pink accent */}
          <mesh position={[0.01,-0.37, 0.04]}><boxGeometry args={[0.16, 0.1, 0.25]} /><meshStandardMaterial color="#F5F0F0" roughness={0.4} /></mesh>
          <mesh position={[0,-0.37, 0.13]}><boxGeometry args={[0.14, 0.065, 0.06]} /><meshStandardMaterial color="#FF9EB5" roughness={0.4} /></mesh>
        </group>
        {/* RIGHT LEG */}
        <group ref={rLeg} position={[0.13, 0.37, 0]}>
          <mesh position={[0,-0.13, 0]}><capsuleGeometry args={[0.084, 0.22, 4, 8]} /><meshStandardMaterial color="#2C3E50" roughness={0.65} /></mesh>
          <mesh position={[0.01,-0.37, 0.04]}><boxGeometry args={[0.16, 0.1, 0.25]} /><meshStandardMaterial color="#F5F0F0" roughness={0.4} /></mesh>
          <mesh position={[0,-0.37, 0.13]}><boxGeometry args={[0.14, 0.065, 0.06]} /><meshStandardMaterial color="#FF9EB5" roughness={0.4} /></mesh>
        </group>
      </group>
    </group>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  GLOWING 3-D HEART COLLECTIBLE
// ════════════════════════════════════════════════════════════════════════════
function HeartCollectible3D({
  position, active, isFinal, heartId, onCollect,
}: {
  position: [number, number, number]
  active: boolean
  isFinal: boolean
  heartId: number
  onCollect: (id: number) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 2.2) * 0.18
      groupRef.current.rotation.y = t * 0.8
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.12
      glowRef.current.scale.setScalar(s)
    }
    if (lightRef.current) {
      lightRef.current.intensity = (active ? 3.5 : 1.8) + Math.sin(t * 4) * 0.5
    }
  })

  const sc = isFinal ? 1.5 : 1.0

  return (
    <group ref={groupRef} position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.55 * sc, 16, 16]} />
        <meshStandardMaterial
          color="#FF4D7A"
          emissive="#FF4D7A"
          emissiveIntensity={active ? 1.8 : 0.9}
          transparent opacity={0.18}
          roughness={1}
        />
      </mesh>
      {/* Heart body — two spheres + rotated box */}
      <mesh position={[-0.18 * sc, 0.08 * sc, 0]} scale={[sc, sc, sc]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#FF2D55" emissive="#FF2D55" emissiveIntensity={active ? 1.2 : 0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.18 * sc, 0.08 * sc, 0]} scale={[sc, sc, sc]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#FF2D55" emissive="#FF2D55" emissiveIntensity={active ? 1.2 : 0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.06 * sc, 0]} rotation={[0, 0, Math.PI / 4]} scale={[sc, sc, sc]}>
        <boxGeometry args={[0.31, 0.31, 0.18]} />
        <meshStandardMaterial color="#FF2D55" emissive="#FF2D55" emissiveIntensity={active ? 1.2 : 0.6} roughness={0.3} />
      </mesh>
      {/* Highlight shine */}
      <mesh position={[-0.08 * sc, 0.12 * sc, 0.2 * sc]}>
        <sphereGeometry args={[0.06 * sc, 8, 8]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} transparent opacity={0.7} />
      </mesh>
      {/* Point light for glow */}
      <pointLight ref={lightRef} color="#FF4D7A" intensity={2} distance={4} />

      {/* Interact prompt */}
      {active && (
        <Html center position={[0, 0.9, 0]}>
          <div style={{
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            borderRadius: 999, padding: '4px 12px', color: '#FFD166',
            fontFamily: 'inherit', fontSize: '0.65rem', fontWeight: 800,
            whiteSpace: 'nowrap', border: '1px solid rgba(255,200,80,0.4)',
            pointerEvents: 'none',
          }}>
            ❤️ E — COLLECT
          </div>
        </Html>
      )}
    </group>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  CHERRY BLOSSOM MORNING GARDEN — 3-D WORLD
// ════════════════════════════════════════════════════════════════════════════
function CherryTree({ pos, h = 4, sc = 1 }: { pos: [number, number, number]; h?: number; sc?: number }) {
  return (
    <group position={pos} scale={[sc, sc, sc]}>
      {/* Trunk */}
      <mesh position={[0, h * 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.26, h * 0.75, 8]} />
        <meshStandardMaterial color="#6B3510" roughness={0.9} />
      </mesh>
      {/* Big center cluster */}
      <mesh position={[0, h * 0.78, 0]} castShadow>
        <sphereGeometry args={[1.3, 14, 14]} />
        <meshStandardMaterial color="#FF85A1" roughness={0.6} emissive="#FF85A1" emissiveIntensity={0.22} />
      </mesh>
      {/* Side clusters */}
      <mesh position={[-0.9, h * 0.70, 0.2]}>
        <sphereGeometry args={[0.95, 10, 10]} />
        <meshStandardMaterial color="#FFB3C6" roughness={0.6} emissive="#FFB3C6" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0.85, h * 0.71, -0.3]}>
        <sphereGeometry args={[0.88, 10, 10]} />
        <meshStandardMaterial color="#FF6B8A" roughness={0.6} emissive="#FF6B8A" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.2, h * 0.60, 0.7]}>
        <sphereGeometry args={[0.80, 10, 10]} />
        <meshStandardMaterial color="#FFAEC9" roughness={0.6} emissive="#FFAEC9" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[-0.3, h * 0.62, -0.8]}>
        <sphereGeometry args={[0.75, 10, 10]} />
        <meshStandardMaterial color="#FF9BB5" roughness={0.6} emissive="#FF9BB5" emissiveIntensity={0.18} />
      </mesh>
      {/* Top wisp */}
      <mesh position={[0, h * 0.92, 0]}>
        <sphereGeometry args={[0.55, 8, 8]} />
        <meshStandardMaterial color="#FFC8D8" roughness={0.5} emissive="#FFC8D8" emissiveIntensity={0.25} />
      </mesh>
      {/* Soft pink glow under tree */}
      <pointLight position={[0, h * 0.75, 0]} color="#FF9BB5" intensity={0.9} distance={5} />
    </group>
  )
}

function Lantern({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.06, 0.08, 2.4, 8]} /><meshStandardMaterial color="#8B6914" roughness={0.8} /></mesh>
      <mesh position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.45, 6]} />
        <meshStandardMaterial color="#FF9A30" roughness={0.3} emissive="#FFB830" emissiveIntensity={0.7} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 2.82, 0]}><cylinderGeometry args={[0.14, 0.22, 0.12, 6]} /><meshStandardMaterial color="#C07820" roughness={0.5} /></mesh>
      <pointLight position={[0, 2.55, 0]} color="#FFB040" intensity={2.5} distance={8} />
    </group>
  )
}

function GameWorld() {
  return (
    <>
      {/* ── BRIGHT MORNING SKY & GROUND ──────────────────────────────── */}
      {/* Bright green grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0, 2]} receiveShadow>
        <planeGeometry args={[80, 70]} />
        <meshStandardMaterial color="#7EC850" roughness={0.85} />
      </mesh>
      {/* Pink petal scatter on grass */}
      {Array.from({ length: 40 }, (_, i) => {
        const fx = (i * 17.3 + 5) % 60 - 15; const fz = (i * 9.1 + 3) % 50 - 15
        const fc = ['#FFB3C6','#FF85A1','#FFC8D8','#FF9BB5','#FFAEC9'][i % 5]
        return <mesh key={i} rotation={[-Math.PI/2,0,i*0.8]} position={[fx, 0.02, fz]}>
          <circleGeometry args={[0.14, 5]} />
          <meshStandardMaterial color={fc} emissive={fc} emissiveIntensity={0.35} />
        </mesh>
      })}

      {/* ── WARM STONE PATH ──────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.01, 0]}>
        <planeGeometry args={[38, 4.2]} />
        <meshStandardMaterial color="#D4B896" roughness={0.85} />
      </mesh>
      {Array.from({ length: 18 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, i * 0.1]} position={[-4 + i * 2.4, 0.02, (i % 2 === 0 ? 0.5 : -0.5)]}>
          <boxGeometry args={[1.7, 1.3, 0.04]} />
          <meshStandardMaterial color="#C8A878" roughness={0.9} />
        </mesh>
      ))}

      {/* ── CHERRY BLOSSOM TREES ─────────────────────────────────────── */}
      <CherryTree pos={[-4, 0, -4]} h={5.5} sc={1.15} />
      <CherryTree pos={[3,  0, -5]} h={5.0} />
      <CherryTree pos={[8,  0, -6]} h={6.0} sc={1.25} />
      <CherryTree pos={[13, 0, -5]} h={5.2} />
      <CherryTree pos={[18, 0, -6]} h={5.5} sc={1.1} />
      <CherryTree pos={[24, 0, -4]} h={5.0} />
      <CherryTree pos={[-3, 0,  7]} h={5.0} sc={0.95} />
      <CherryTree pos={[5,  0,  8]} h={5.5} />
      <CherryTree pos={[13, 0,  7]} h={4.8} sc={1.1} />
      <CherryTree pos={[21, 0,  6]} h={5.6} sc={1.2} />
      {/* Extra trees for density */}
      <CherryTree pos={[0,  0, -8]} h={4.5} sc={0.9} />
      <CherryTree pos={[10, 0,  10]} h={4.6} sc={0.95} />

      {/* ── LANTERNS ─────────────────────────────────────────────────── */}
      <Lantern pos={[-1, 0, -2.5]} />
      <Lantern pos={[5,  0, -2.8]} />
      <Lantern pos={[11, 0, -2.6]} />
      <Lantern pos={[17, 0, -2.7]} />
      <Lantern pos={[23, 0, -2.4]} />
      <Lantern pos={[2,  0,  2.5]} />
      <Lantern pos={[9,  0,  2.7]} />
      <Lantern pos={[16, 0,  2.6]} />

      {/* ── FAIRY-TALE CASTLE (daytime pastel) ───────────────────────── */}
      <group position={[32, 0, -20]} scale={[0.75, 0.75, 0.75]}>
        <mesh position={[0, 6, 0]}><cylinderGeometry args={[1.8, 2, 12, 8]} /><meshStandardMaterial color="#E8C8FF" roughness={0.5} emissive="#C090E0" emissiveIntensity={0.12} /></mesh>
        <mesh position={[0, 12.4, 0]}><coneGeometry args={[2, 3.5, 8]} /><meshStandardMaterial color="#FF9EB5" roughness={0.5} emissive="#FF9EB5" emissiveIntensity={0.1} /></mesh>
        <mesh position={[-4, 4.5, 0]}><cylinderGeometry args={[1.2, 1.4, 9, 8]} /><meshStandardMaterial color="#F0D8FF" roughness={0.5} /></mesh>
        <mesh position={[-4, 9.8, 0]}><coneGeometry args={[1.4, 2.8, 8]} /><meshStandardMaterial color="#FFB3C6" roughness={0.5} emissive="#FFB3C6" emissiveIntensity={0.08} /></mesh>
        <mesh position={[4, 4.5, 0]}><cylinderGeometry args={[1.2, 1.4, 9, 8]} /><meshStandardMaterial color="#F0D8FF" roughness={0.5} /></mesh>
        <mesh position={[4, 9.8, 0]}><coneGeometry args={[1.4, 2.8, 8]} /><meshStandardMaterial color="#FFB3C6" roughness={0.5} emissive="#FFB3C6" emissiveIntensity={0.08} /></mesh>
        <pointLight position={[0, 8, 2]} color="#FFE0FF" intensity={2} distance={15} />
      </group>

      {/* ── SUN ──────────────────────────────────────────────────────── */}
      <mesh position={[-10, 26, -35]}>
        <sphereGeometry args={[5, 20, 20]} />
        <meshStandardMaterial color="#FFF5A0" emissive="#FFE000" emissiveIntensity={1.2} roughness={0.2} />
      </mesh>
      <pointLight position={[-10, 26, -35]} color="#FFE080" intensity={2.0} distance={120} />

      {/* ── FOUNTAIN ─────────────────────────────────────────────────── */}
      <group position={[7, 0, -1.5]}>
        <mesh><cylinderGeometry args={[1.3, 1.5, 0.45, 16]} /><meshStandardMaterial color="#D4B8E0" roughness={0.5} /></mesh>
        <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.14, 0.16, 1.2, 8]} /><meshStandardMaterial color="#C8A0E0" roughness={0.5} /></mesh>
        <mesh position={[0, 1.3, 0]}><sphereGeometry args={[0.3, 12, 12]} /><meshStandardMaterial color="#A0D4FF" roughness={0.2} transparent opacity={0.8} emissive="#60B0FF" emissiveIntensity={0.35} /></mesh>
        <pointLight position={[0, 0.8, 0]} color="#80D0FF" intensity={2} distance={7} />
      </group>

      {/* ── GROUND FLOWERS ───────────────────────────────────────────── */}
      {Array.from({ length: 35 }, (_, i) => {
        const fx = (i * 13.7) % 48 - 12; const fz = (i * 7.3) % 36 - 12
        const fc = ['#FF85A1','#FFD166','#80D4FF','#FF758C','#FFC8D8','#FFEC8B'][i % 6]
        return <mesh key={i} position={[fx, 0.08, fz]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color={fc} emissive={fc} emissiveIntensity={0.55} />
        </mesh>
      })}

      {/* ── BRIGHT MORNING LIGHTING ──────────────────────────────────── */}
      <ambientLight intensity={1.4} color="#FFF5F0" />
      <directionalLight position={[-8, 22, -10]} intensity={2.2} color="#FFE9B0" castShadow shadow-mapSize={[1024, 1024]} />
      <hemisphereLight args={['#87CEEB', '#7EC850', 1.0]} />

      {/* Falling cherry blossom petal sparkles */}
      <Sparkles count={80} scale={[45, 10, 35]} size={3.5} speed={0.5} color="#FFB3C6" opacity={0.9} position={[8, 4, 0]} />
      <Sparkles count={40} scale={[30, 8, 25]} size={2.5} speed={0.3} color="#FFAEC9" opacity={0.7} position={[5, 6, 0]} />

      {/* Light morning haze fog */}
      <fog attach="fog" args={['#FFE8F0', 30, 80]} />
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN GAME SCENE — character movement, camera, companion AI, collection
// ════════════════════════════════════════════════════════════════════════════
interface SceneProps {
  phase: GamePhase
  collected: number[]
  onCollectHeart: (id: number) => void
  joystickRef: React.MutableRefObject<{ x: number; z: number }>
  onNearHeart: (id: number | null) => void
  nearHeartIdRef: React.MutableRefObject<number | null>
  triggerCollect: React.MutableRefObject<boolean>
}

function GameScene({
  phase, collected, onCollectHeart,
  joystickRef, onNearHeart, nearHeartIdRef, triggerCollect,
}: SceneProps) {
  const { camera } = useThree()
  const keys = useRef(new Set<string>())

  const aymanGroup  = useRef<THREE.Group>(null)
  const saudGroup   = useRef<THREE.Group>(null)
  const aymanShadow = useRef<THREE.Mesh>(null)
  const saudShadow  = useRef<THREE.Mesh>(null)

  // world-space refs (no re-render per frame)
  const aymanPos  = useRef(new THREE.Vector3(0, 0, 0))
  const saudPos   = useRef(new THREE.Vector3(-2.2, 0, 0))
  const aymanFace = useRef(0) // Y angle
  const saudFace  = useRef(0)
  const camPos    = useRef(new THREE.Vector3(0, 5, 7))
  const camLook   = useRef(new THREE.Vector3(0, 1.2, 0))

  const [aymanState, setAymanState] = useState<AnimState>('idle')
  const [saudState,  setSaudState]  = useState<AnimState>('idle')

  useEffect(() => {
    const down = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase())
    const up   = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase())
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame((_, delta) => {
    if (phase !== 'PLAYING') return

    // ── Input ──────────────────────────────────────────────────────────────
    const k    = keys.current
    const jx   = joystickRef.current.x
    const jz   = joystickRef.current.z
    const isRunning = k.has('shift') || (Math.abs(jx) + Math.abs(jz) > 1.4)
    const SPEED = isRunning ? 5.8 : 3.2

    let dx = jx
    let dz = jz
    if (k.has('a') || k.has('arrowleft'))  dx -= 1
    if (k.has('d') || k.has('arrowright')) dx += 1
    if (k.has('w') || k.has('arrowup'))    dz -= 1
    if (k.has('s') || k.has('arrowdown'))  dz += 1

    const len = Math.sqrt(dx * dx + dz * dz)
    let moving = false
    if (len > 0.08) {
      const nx = dx / len; const nz = dz / len
      aymanPos.current.x = Math.max(-12, Math.min(32, aymanPos.current.x + nx * SPEED * delta))
      aymanPos.current.z = Math.max(-18, Math.min(18, aymanPos.current.z + nz * SPEED * delta))
      aymanFace.current  = Math.atan2(nx, nz)
      moving = true
      setAymanState(isRunning ? 'run' : 'walk')
    } else {
      setAymanState('idle')
    }

    // ── Apply ayman position — lifted 0.5 above ground ────────────────────
    const CHAR_Y = 0.48 // feet sit on ground
    if (aymanGroup.current) {
      aymanGroup.current.position.set(aymanPos.current.x, CHAR_Y, aymanPos.current.z)
      aymanGroup.current.rotation.y = THREE.MathUtils.lerp(
        aymanGroup.current.rotation.y, aymanFace.current, 0.14
      )
    }
    if (aymanShadow.current) {
      aymanShadow.current.position.x = aymanPos.current.x
      aymanShadow.current.position.z = aymanPos.current.z
    }

    // ── Saud companion follow ──────────────────────────────────────────────
    const targetX = aymanPos.current.x - Math.sin(aymanFace.current) * 2.2
    const targetZ = aymanPos.current.z - Math.cos(aymanFace.current) * 2.2
    const sdx = targetX - saudPos.current.x
    const sdz = targetZ - saudPos.current.z
    const sdist = Math.sqrt(sdx * sdx + sdz * sdz)

    if (sdist > 0.25) {
      const sSpeed = Math.min(sdist * 5, isRunning ? 6.5 : 4.5)
      saudPos.current.x += (sdx / sdist) * sSpeed * delta
      saudPos.current.z += (sdz / sdist) * sSpeed * delta
      saudFace.current   = Math.atan2(sdx, sdz)
      setSaudState(sdist > 3 ? 'run' : 'walk')
    } else {
      setSaudState('idle')
    }

    if (saudGroup.current) {
      saudGroup.current.position.set(saudPos.current.x, CHAR_Y, saudPos.current.z)
      saudGroup.current.rotation.y = THREE.MathUtils.lerp(
        saudGroup.current.rotation.y, saudFace.current, 0.12
      )
    }
    if (saudShadow.current) {
      saudShadow.current.position.x = saudPos.current.x
      saudShadow.current.position.z = saudPos.current.z
    }

    // ── Camera — low angle showing full body ───────────────────────────────
    const camDist = 9.0
    const camH    = 2.8
    const targetCam = new THREE.Vector3(
      aymanPos.current.x - Math.sin(aymanFace.current) * camDist * 0.35,
      CHAR_Y + camH,
      aymanPos.current.z - Math.cos(aymanFace.current) * camDist,
    )
    camPos.current.lerp(targetCam, 0.06)
    camera.position.copy(camPos.current)

    const targetLook = new THREE.Vector3(
      aymanPos.current.x,
      CHAR_Y + 1.0,
      aymanPos.current.z
    )
    camLook.current.lerp(targetLook, 0.08)
    camera.lookAt(camLook.current)

    // ── Heart collection detection ─────────────────────────────────────────
    let nearId: number | null = null
    for (const h of HEARTS) {
      if (collected.includes(h.id)) continue
      const dx2 = h.pos[0] - aymanPos.current.x
      const dz2 = h.pos[2] - aymanPos.current.z
      const dist = Math.sqrt(dx2 * dx2 + dz2 * dz2)
      if (dist < 1.8) { nearId = h.id; break }
    }
    if (nearId !== nearHeartIdRef.current) {
      nearHeartIdRef.current = nearId
      onNearHeart(nearId)
    }

    // ── E key or trigger from button ──────────────────────────────────────
    if ((k.has('e') || triggerCollect.current) && nearId !== null) {
      triggerCollect.current = false
      onCollectHeart(nearId)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault fov={68} near={0.1} far={150} />
      <GameWorld />
      {HEARTS.map(h => {
        if (collected.includes(h.id)) return null
        return (
          <HeartCollectible3D
            key={h.id}
            position={h.pos}
            active={nearHeartIdRef.current === h.id}
            isFinal={h.type === 'final'}
            heartId={h.id}
            onCollect={onCollectHeart}
          />
        )
      })}
      {/* Ayman blob shadow */}
      <mesh ref={aymanShadow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.55, 16]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.22} roughness={1} />
      </mesh>
      {/* Saud blob shadow */}
      <mesh ref={saudShadow} rotation={[-Math.PI / 2, 0, 0]} position={[-2.2, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.55, 16]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.22} roughness={1} />
      </mesh>
      <group ref={aymanGroup} position={[0, 0, 0]} castShadow>
        <AymanBody state={aymanState} />
      </group>
      <group ref={saudGroup} position={[-2.2, 0, 0]} castShadow>
        <SaudBody state={saudState} />
      </group>
    </>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  TOUCH DRAG CONTROL — drag anywhere to move, no joystick visual
// ════════════════════════════════════════════════════════════════════════════
function TouchDragControl({ onMove }: { onMove: (x: number, z: number) => void }) {
  const touchRef = useRef<{ id: number; startX: number; startY: number } | null>(null)
  const DEAD = 8    // dead zone px before movement starts
  const MAX  = 65   // max drag distance for full speed

  useEffect(() => {
    const moveHandler = (e: TouchEvent) => {
      if (!touchRef.current) return
      const t = Array.from(e.touches).find(t => t.identifier === touchRef.current!.id)
      if (!t) return
      e.preventDefault()
      const dx = t.clientX - touchRef.current.startX
      const dy = t.clientY - touchRef.current.startY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < DEAD) { onMove(0, 0); return }
      const angle = Math.atan2(dy, dx)
      const intensity = Math.min(dist / MAX, 1)
      onMove(Math.cos(angle) * intensity, Math.sin(angle) * intensity)
    }
    const endHandler = (e: TouchEvent) => {
      if (!touchRef.current) return
      const ended = Array.from(e.changedTouches).some(t => t.identifier === touchRef.current!.id)
      if (!ended) return
      touchRef.current = null
      onMove(0, 0)
    }
    window.addEventListener('touchmove', moveHandler, { passive: false })
    window.addEventListener('touchend', endHandler)
    window.addEventListener('touchcancel', endHandler)
    return () => {
      window.removeEventListener('touchmove', moveHandler)
      window.removeEventListener('touchend', endHandler)
      window.removeEventListener('touchcancel', endHandler)
    }
  }, [onMove])

  return (
    <div
      onTouchStart={e => {
        if (touchRef.current) return // already tracking
        const t = e.changedTouches[0]
        // Don't intercept touches near bottom-right (collect button area)
        const isCollectZone = t.clientX > window.innerWidth * 0.72 && t.clientY > window.innerHeight * 0.72
        if (isCollectZone) return
        e.preventDefault()
        touchRef.current = { id: t.identifier, startX: t.clientX, startY: t.clientY }
      }}
      style={{
        position: 'absolute', inset: 0,
        zIndex: 48, touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    />
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  HEART DIALOG CARDS — Birthday Edition for Ayman 🎂
// ════════════════════════════════════════════════════════════════════════════

// ── Card shared shell ──────────────────────────────────────────────────────
function CardShell({ count, accent, children }: {
  count: number; accent: string; children: React.ReactNode
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,3,22,0.78)', backdropFilter: 'blur(10px)', padding: '1rem' }}>
      <motion.div initial={{ scale: 0.72, y: 36, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.42, delay: 0.08 }}
        style={{ background: 'linear-gradient(145deg, #FFF9FC 0%, #FFF0F5 100%)', borderRadius: 28, padding: 'clamp(1.6rem,5vw,2.6rem) clamp(1.2rem,4vw,2rem) clamp(1.4rem,4vw,2rem)', maxWidth: 380, width: '100%', maxHeight: '90dvh', overflowY: 'auto', textAlign: 'center', boxShadow: `0 32px 90px rgba(0,0,0,0.5), 0 0 0 2px ${accent}40`, position: 'relative', WebkitOverflowScrolling: 'touch' }}>
        {/* Decorative corner hearts */}
        <span style={{ position: 'absolute', top: 12, left: 14, fontSize: '0.75rem', color: accent, opacity: 0.5 }}>♥</span>
        <span style={{ position: 'absolute', top: 12, right: 14, fontSize: '0.75rem', color: accent, opacity: 0.5 }}>♥</span>
        <span style={{ position: 'absolute', bottom: 12, left: 14, fontSize: '0.6rem', color: accent, opacity: 0.35 }}>♥</span>
        <span style={{ position: 'absolute', bottom: 12, right: 14, fontSize: '0.6rem', color: accent, opacity: 0.35 }}>♥</span>
        {/* Badge */}
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${accent}, #FF7EB3)`, borderRadius: 999, padding: '4px 16px', fontSize: '0.7rem', color: 'white', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: `0 4px 14px ${accent}55` }}>
          ❤️ {count} / 5 collected
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

// ── HEART 1: Birthday Letter from Saud ────────────────────────────────────
function BirthdayLetterCard({ name, sender, message, onContinue }: {
  name: string; sender: string; message: string; onContinue: () => void
}) {
  return (
    <>
      {/* Falling confetti */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div key={i}
          initial={{ y: '-10%', x: `${(i * 53 + 5) % 95}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
          transition={{ duration: 2.5 + (i % 4) * 0.6, delay: (i * 0.12), ease: 'easeIn', repeat: Infinity, repeatDelay: 1 }}
          style={{ position: 'fixed', zIndex: 201, fontSize: `${0.7 + (i % 3) * 0.5}rem`, pointerEvents: 'none' }}>
          {['🎂', '🎉', '✨', '🌸', '💖', '🎈'][i % 6]}
        </motion.div>
      ))}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.55, delay: 0.2 }}
        style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>💌</motion.div>
      <motion.h3 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
        style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1.15rem, 5vw, 1.45rem)', color: '#FF758C', margin: '0 0 0.35rem', lineHeight: 1.2 }}>
        Happy Birthday, {name}! 🎂
      </motion.h3>
      <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.7rem', color: '#D4609A', letterSpacing: '0.1em', margin: '0 0 1rem' }}>
        — A letter from {sender} —
      </motion.p>
      {/* Parchment-style letter */}
      <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.65 }}
        style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFF3EA)', border: '1.5px dashed rgba(255,117,140,0.35)', borderRadius: 14, padding: '1rem 1.1rem', marginBottom: '1.2rem', textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-birthday-body)', fontSize: 'clamp(0.82rem, 3.2vw, 0.93rem)', color: '#594a4e', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
          {message}
        </p>
      </motion.div>
      <motion.button className="birthday-btn primary" onClick={onContinue}
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.85 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{ fontSize: '0.88rem', padding: '0.65rem 2rem' }}>
        Next ❤️
      </motion.button>
    </>
  )
}

// ── HEART 2: Photo Card — Ayman's Photo + Caption ──────────────────────────
function PhotoCard({ name, caption, onContinue }: {
  name: string; caption: string; onContinue: () => void
}) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</motion.div>
      <motion.h3 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.32 }}
        style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1.05rem, 4.5vw, 1.3rem)', color: '#FF9EB5', margin: '0 0 0.9rem', lineHeight: 1.2 }}>
        The Birthday Girl ✨
      </motion.h3>
      {/* Photo frame */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.45 }}
        style={{ width: 170, height: 170, margin: '0 auto 1rem', borderRadius: 20, background: 'linear-gradient(135deg, #FF9EB5, #FF758C)', padding: 4, boxShadow: '0 8px 32px rgba(255,117,140,0.4)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 17, overflow: 'hidden', background: '#FFF0F5' }}>
          {!imgErr ? (
            <img
              src="/templates/birthday/ayman_photo.jpg"
              alt={name}
              onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            /* Placeholder until user provides the photo */
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FFE5EE, #FFF0F5)', gap: '0.4rem' }}>
              <span style={{ fontSize: '3.5rem' }}>🌸</span>
              <p style={{ fontFamily: 'var(--font-birthday-heading)', color: '#FF9EB5', fontSize: '0.75rem', margin: 0 }}>{name}</p>
            </div>
          )}
        </div>
      </motion.div>
      <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontFamily: 'var(--font-birthday-body)', fontSize: 'clamp(0.82rem, 3.2vw, 0.93rem)', color: '#594a4e', lineHeight: 1.65, margin: '0 0 1.3rem', fontStyle: 'italic' }}>
        "{caption}"
      </motion.p>
      <motion.button className="birthday-btn primary" onClick={onContinue}
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.78 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{ fontSize: '0.88rem', padding: '0.65rem 2rem' }}>
        Next ❤️
      </motion.button>
    </>
  )
}

// ── HEART 3: "5 Things That Make You Special" animated list ───────────────
const SPECIAL_THINGS = [
  { emoji: '😊', text: 'Your smile makes everything brighter' },
  { emoji: '💫', text: 'Your kindness is one of a kind' },
  { emoji: '🌸', text: 'Your laugh is absolutely contagious' },
  { emoji: '✨', text: 'You make every moment unforgettable' },
  { emoji: '💖', text: 'You are loved more than words can say' },
]

function SpecialListCard({ name, onContinue }: { name: string; onContinue: () => void }) {
  const [revealed, setRevealed] = useState(0)
  useEffect(() => {
    if (revealed >= SPECIAL_THINGS.length) return
    const t = setTimeout(() => setRevealed(r => r + 1), 650)
    return () => clearTimeout(t)
  }, [revealed])
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.55, delay: 0.15 }}
        style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💫</motion.div>
      <motion.h3 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.28 }}
        style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1rem, 4.5vw, 1.25rem)', color: '#C084FC', margin: '0 0 1rem', lineHeight: 1.2 }}>
        5 Things That Make You Special, {name} ✨
      </motion.h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', textAlign: 'left' }}>
        {SPECIAL_THINGS.map((item, i) => (
          <AnimatePresence key={i}>
            {i < revealed && (
              <motion.div
                initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'rgba(192,132,252,0.08)', border: '1.5px solid rgba(192,132,252,0.2)', borderRadius: 12, padding: '0.55rem 0.75rem' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.emoji}</span>
                <span style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.82rem', color: '#594a4e', lineHeight: 1.4 }}>{item.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      {revealed >= SPECIAL_THINGS.length && (
        <motion.button className="birthday-btn primary" onClick={onContinue}
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ fontSize: '0.88rem', padding: '0.65rem 2rem' }}>
          Next ❤️
        </motion.button>
      )}
    </>
  )
}

// ── HEART 4: Birthday Trivia about Ayman ──────────────────────────────────
const TRIVIA_OPTS = [
  { emoji: '🎂', label: 'A Fancy Cake' },
  { emoji: '🎁', label: 'Lots of Gifts' },
  { emoji: '💖', label: 'Love & Hugs' },
  { emoji: '🎉', label: 'A Big Party' },
]

function BirthdayTriviaCard({ name, sender, onContinue }: {
  name: string; sender: string; onContinue: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const correct = 2 // "Love & Hugs"
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.55, delay: 0.15 }}
        style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎂</motion.div>
      <motion.h3 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.28 }}
        style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1rem, 4.5vw, 1.22rem)', color: '#FFD166', margin: '0 0 0.3rem', lineHeight: 1.25 }}>
        Birthday Trivia! 🎉
      </motion.h3>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
        style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.8rem', color: '#8a797d', margin: '0 0 1rem' }}>
        What does {name} love most on her birthday?
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.9rem' }}>
        {TRIVIA_OPTS.map((opt, i) => {
          const isCorrect = i === correct
          const isSelected = i === selected
          const revealed = selected !== null
          return (
            <motion.button key={i} whileHover={!revealed ? { scale: 1.04 } : {}} whileTap={!revealed ? { scale: 0.96 } : {}}
              onClick={() => { if (selected === null) { setSelected(i); if (isCorrect) setTimeout(onContinue, 2000); else setTimeout(onContinue, 2200) } }}
              style={{ padding: '0.7rem 0.4rem', borderRadius: 14, cursor: revealed ? 'default' : 'pointer', fontFamily: 'var(--font-birthday-body)', fontSize: '0.8rem', fontWeight: 700, color: '#594a4e', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', transition: 'all 0.25s ease', border: `2px solid ${revealed ? (isCorrect ? '#28a745' : isSelected ? '#dc3545' : 'rgba(255,200,80,0.25)') : 'rgba(255,200,80,0.35)'}`, background: revealed ? (isCorrect ? '#d4edda' : isSelected ? '#f8d7da' : 'rgba(255,255,255,0.8)') : 'rgba(255,255,255,0.8)' }}>
              <span style={{ fontSize: '1.4rem' }}>{opt.emoji}</span>
              <span>{opt.label}</span>
              {revealed && <span style={{ fontSize: '0.65rem', marginTop: 2 }}>{isCorrect ? '✓ Yes! ❤️' : isSelected ? '✗ Not quite!' : ''}</span>}
            </motion.button>
          )
        })}
      </div>
      {selected !== null && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: '0.95rem', color: '#FFD166', margin: 0 }}>
          {selected === correct
            ? `Exactly right, ${sender}! 💖 ${name} loves you too!`
            : `Close! But ${name} loves ❤️ Love & Hugs most! 😊`}
        </motion.p>
      )}
    </>
  )
}

// ── HEART 5: Make a Wish 🕯️ — interactive candle blow + final reveal ──────
function MakeAWishCard({ name, message, onContinue }: {
  name: string; message: string; onContinue: () => void
}) {
  const [blown, setBlown] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    setTimeout(() => setRevealed(true), 1200)
  }
  return (
    <>
      {!revealed ? (
        <>
          <motion.h3 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1.1rem, 5vw, 1.3rem)', color: '#FF758C', margin: '0 0 0.3rem', lineHeight: 1.2 }}>
            Make a Wish, {name}! 🌠
          </motion.h3>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.78rem', color: '#8a797d', margin: '0 0 1.1rem' }}>
            Tap the candle to blow it out ✨
          </motion.p>
          {/* Birthday cake */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.2rem' }}>
            {/* Candle flame */}
            {!blown && (
              <motion.div animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], rotate: [0, 3, -3, 2, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 18, height: 28, background: 'linear-gradient(180deg, #FFF5A0 0%, #FFB830 60%, #FF7A00 100%)', borderRadius: '50% 50% 30% 30%', marginBottom: 2, filter: 'drop-shadow(0 0 8px #FFB83088)' }} />
            )}
            {blown && (
              <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0, opacity: 0 }} transition={{ duration: 0.4 }}
                style={{ width: 18, height: 28, background: '#ccc', borderRadius: '50% 50% 30% 30%', marginBottom: 2 }} />
            )}
            {/* Candle */}
            <div style={{ width: 18, height: 50, background: 'linear-gradient(135deg, #FF9EB5, #FF758C)', borderRadius: '4px 4px 2px 2px', marginBottom: 0 }} />
            {/* Cake */}
            <motion.button onClick={handleBlow} whileTap={!blown ? { scale: 0.94 } : {}}
              style={{ background: 'none', border: 'none', cursor: blown ? 'default' : 'pointer', padding: 0 }}>
              <div style={{ width: 110, background: 'linear-gradient(135deg, #FF9EB5, #FFB3C6)', borderRadius: '8px 8px 4px 4px', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: '0.7rem', color: 'white', letterSpacing: '0.05em' }}>Happy Birthday!</span>
              </div>
              <div style={{ width: 120, background: 'linear-gradient(135deg, #FFD166, #FFC43D)', borderRadius: '4px 4px 8px 8px', height: 28, marginLeft: -5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1rem' }}>🍓🍒🌸</span>
              </div>
            </motion.button>
          </motion.div>
          {blown && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: 'var(--font-birthday-heading)', color: '#FF758C', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>
              ✨ Your wish has been sent! ✨
            </motion.p>
          )}
        </>
      ) : (
        /* Final message reveal */
        <>
          {/* Celebration particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div key={i}
              initial={{ y: 0, x: 0, opacity: 1, scale: 1 }} animate={{ y: -80 - i * 12, x: (i % 2 === 0 ? 1 : -1) * (20 + i * 8), opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.2 + i * 0.1, delay: i * 0.06 }}
              style={{ position: 'absolute', fontSize: '1rem', pointerEvents: 'none', top: '45%', left: '50%' }}>
              {['💖', '✨', '🌸', '⭐', '🎉', '💫'][i % 6]}
            </motion.div>
          ))}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.55 }}
            style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>👑</motion.div>
          <motion.h3 initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1.15rem, 5vw, 1.4rem)', color: '#FFD166', margin: '0 0 0.8rem', lineHeight: 1.2 }}>
            You Found All 5 Hearts! 🎉
          </motion.h3>
          <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'var(--font-birthday-body)', fontSize: 'clamp(0.83rem, 3.2vw, 0.95rem)', color: '#594a4e', lineHeight: 1.7, margin: '0 0 1.4rem' }}>
            {message}
          </motion.p>
          <motion.button className="birthday-btn primary" onClick={onContinue}
            initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.72 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ fontSize: '0.9rem', padding: '0.7rem 2.2rem' }}>
            See Your Surprise →
          </motion.button>
        </>
      )}
    </>
  )
}

// ── Main router — picks which card to show ─────────────────────────────────
function HeartDialogOverlay({ heartType, config, collectedCount, onContinue }: {
  heartType: HeartInfo['type']
  config: { playerName: string; companionName: string; memoryMsg: string; complimentMsg: string; secretMsg: string; finalMsg: string }
  collectedCount: number
  onContinue: () => void
}) {
  const accentMap: Record<HeartInfo['type'], string> = {
    memory: '#FF758C', compliment: '#FF9EB5', secret: '#C084FC', question: '#FFD166', final: '#FFD166',
  }
  const accent = accentMap[heartType]

  return (
    <CardShell count={collectedCount} accent={accent}>
      {heartType === 'memory' && (
        <BirthdayLetterCard
          name={config.playerName}
          sender={config.companionName}
          message={config.memoryMsg}
          onContinue={onContinue}
        />
      )}
      {heartType === 'compliment' && (
        <PhotoCard
          name={config.playerName}
          caption={config.complimentMsg}
          onContinue={onContinue}
        />
      )}
      {heartType === 'secret' && (
        <SpecialListCard name={config.playerName} onContinue={onContinue} />
      )}
      {heartType === 'question' && (
        <BirthdayTriviaCard
          name={config.playerName}
          sender={config.companionName}
          onContinue={onContinue}
        />
      )}
      {heartType === 'final' && (
        <MakeAWishCard
          name={config.playerName}
          message={config.finalMsg}
          onContinue={onContinue}
        />
      )}
    </CardShell>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  FINAL CELEBRATION SCREEN
// ════════════════════════════════════════════════════════════════════════════
function FinalScreen({ name, sender, onComplete }: { name: string; sender: string; onComplete: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'absolute', inset: 0, zIndex: 300, background: 'radial-gradient(ellipse at center, #2D0850 0%, #0D0628 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div key={i} initial={{ y: '110%', x: `${(i * 41 + 10) % 90}%`, opacity: 1 }} animate={{ y: '-15%', opacity: [1, 1, 0] }} transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, ease: 'easeOut' }}
          style={{ position: 'absolute', fontSize: `${0.8 + Math.random() * 1.5}rem`, pointerEvents: 'none' }}>
          {['💖', '💕', '✨', '⭐', '🌸', '💝'][i % 6]}
        </motion.div>
      ))}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.5 }} style={{ fontSize: '4.5rem', marginBottom: '1.2rem' }}>💖</motion.div>
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
        style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(1.6rem, 6vw, 2.1rem)', color: '#FF9EB5', textAlign: 'center', margin: '0 0 0.75rem', textShadow: '0 0 30px rgba(255,158,181,0.6)' }}>
        You Found Them All! ❤️
      </motion.h2>
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ fontFamily: 'var(--font-birthday-body)', fontSize: 'clamp(0.88rem, 3.5vw, 1rem)', color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.65, maxWidth: 300, marginBottom: '2rem' }}>
        You completed our little love quest, {name}.<br />Thank you for always being you.<br /><br />— {sender} ❤️
      </motion.p>
      <motion.button className="birthday-btn primary" onClick={onComplete}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
        See Your Surprise →
      </motion.button>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  ROOT EXPORT — LoveQuestGame3D
// ════════════════════════════════════════════════════════════════════════════
export interface LoveQuestGame3DProps {
  data: BirthdayConfig
  onComplete: () => void
}

export default function LoveQuestGame3D({ data, onComplete }: LoveQuestGame3DProps) {
  const name   = data.birthdayPersonName  || 'Ayman'
  const sender = (data as any).senderName || 'Saud'
  const msgs   = data.bouquetMessages || []

  const config = {
    playerName:    name,
    companionName: sender,
    memoryMsg:     msgs[0] || 'Remember the first time we met? It changed everything.',
    complimentMsg: msgs[1] || 'Your smile always makes my whole day.',
    secretMsg:     msgs[2] || "Honestly? I'm just so grateful you exist in my life. 🥹",
    finalMsg:      data.birthdayMessage || `Happy Birthday ${name}! You make life so much better. ❤️`,
  }

  const [phase,     setPhase]     = useState<GamePhase>('INTRO')
  const [collected, setCollected] = useState<number[]>([])
  const [nearHeart, setNearHeart] = useState<number | null>(null)
  const [dialogHeart, setDialogHeart] = useState<HeartInfo | null>(null)

  const joystickRef    = useRef<{ x: number; z: number }>({ x: 0, z: 0 })
  const nearHeartIdRef = useRef<number | null>(null)
  const triggerCollect = useRef(false)

  const handleJoystick = useCallback((x: number, z: number) => {
    joystickRef.current = { x, z }
  }, [])

  const handleCollectHeart = useCallback((id: number) => {
    if (collected.includes(id)) return
    const h = HEARTS.find(h => h.id === id)!
    const newCollected = [...collected, id]
    setCollected(newCollected)
    setPhase('HEART_DIALOG')
    setDialogHeart(h)
    // Store whether this is the last heart so continue handler knows
    if (newCollected.length >= 5) {
      // will be handled by MakeAWishCard's onContinue -> onComplete
    }
  }, [collected])

  const handleDialogContinue = useCallback(() => {
    const newLen = collected.length // already updated by setCollected before we get here
    setDialogHeart(null)
    if (dialogHeart?.type === 'final') {
      // MakeAWishCard's final button calls onComplete directly via onContinue prop
      onComplete()
    } else {
      setPhase('PLAYING')
    }
  }, [collected, dialogHeart, onComplete])

  // Intro screen
  if (phase === 'INTRO') {
    return (
      <motion.section className="birthday-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ background: 'linear-gradient(180deg, #0D0628 0%, #2D0F4A 55%, #6B2560 100%)', justifyContent: 'center', padding: '0' }}>
        <motion.div style={{ textAlign: 'center', padding: '0 2rem', zIndex: 10, maxWidth: 420 }}>
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', color: 'rgba(255,180,200,0.7)', letterSpacing: '0.18em', marginBottom: '0.25rem' }}>OUR LITTLE</div>
            <h2 style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: 'clamp(2.8rem, 10vw, 3.8rem)', color: '#FF9EB5', margin: '0 0 0.2rem', lineHeight: 1, textShadow: '0 0 40px rgba(255,158,181,0.65)' }}>Love Quest</h2>
            <div style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.78rem', color: 'rgba(255,200,220,0.6)', letterSpacing: '0.12em' }}>A TINY ADVENTURE MADE JUST FOR YOU ❤️</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,158,181,0.28)', borderRadius: 12, padding: '0.4rem 1.1rem', margin: '1.5rem 0 0.4rem', fontFamily: 'var(--font-birthday-heading)', fontSize: '1.05rem', color: 'rgba(255,200,220,0.9)' }}>
            {name} &amp; {sender} ❤️
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.88rem', color: 'rgba(255,200,220,0.65)', lineHeight: 1.65, maxWidth: 300, margin: '0 auto 1.8rem' }}>
            I left 5 little hearts around this magical world. Each one holds a little surprise just for you. Saud will always be right behind you. ❤️
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,158,181,0.2)', borderRadius: 12, padding: '0.6rem 1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-birthday-body)', fontSize: '0.72rem', color: 'rgba(255,200,220,0.55)', lineHeight: 1.7 }}>
              Desktop: WASD / Arrow Keys — E to Collect<br />Mobile: Joystick + ❤️ button
            </div>
            <motion.button className="birthday-btn primary" onClick={() => setPhase('PLAYING')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ fontSize: '1rem', padding: '0.9rem 2.8rem' }}>
              Let&apos;s Go! →
            </motion.button>
          </motion.div>
        </motion.div>
        {/* Stars decoration */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: `${(i * 137 + 11) % 100}%`, top: `${(i * 89 + 5) % 60}%`, width: 2 + (i % 3), height: 2 + (i % 3), borderRadius: '50%', background: 'white', opacity: 0.3 + (i % 4) * 0.15, animation: `star-twinkle ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${(i * 0.3) % 3}s` }}/>
          ))}
        </div>
        <style>{`@keyframes star-twinkle{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.9;transform:scale(1.4)}}`}</style>
      </motion.section>
    )
  }

  // Complete screen
  if (phase === 'COMPLETE') {
    return (
      <motion.section className="birthday-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: 0 }}>
        <FinalScreen name={name} sender={sender} onComplete={onComplete} />
      </motion.section>
    )
  }

  // PLAYING / HEART_DIALOG
  return (
    <motion.section className="birthday-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ padding: 0, overflow: 'hidden', position: 'relative', userSelect: 'none', touchAction: 'none', WebkitUserSelect: 'none', background: '#FFE8F0' }}>

      {/* 3-D Canvas */}
      <Suspense fallback={
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0628', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '2.5rem', animation: 'spin 1s linear infinite' }}>💖</div>
          <p style={{ fontFamily: 'var(--font-birthday-heading)', color: '#FF9EB5', fontSize: '1rem' }}>Loading World...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      }>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
          style={{ position: 'absolute', inset: 0, touchAction: 'none' }}
        >
          <GameScene
            phase={phase}
            collected={collected}
            onCollectHeart={handleCollectHeart}
            joystickRef={joystickRef}
            onNearHeart={setNearHeart}
            nearHeartIdRef={nearHeartIdRef}
            triggerCollect={triggerCollect}
          />
        </Canvas>
      </Suspense>

      {/* HUD — heart counter */}
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,100,140,0.7)', backdropFilter: 'blur(10px)', borderRadius: 999, padding: '6px 16px', border: '1.5px solid rgba(255,255,255,0.4)', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(255,100,140,0.35)' }}>
        <span style={{ fontSize: '0.9rem' }}>❤️</span>
        <span style={{ fontFamily: 'var(--font-birthday-body)', fontWeight: 800, color: 'white', fontSize: '0.88rem' }}>{collected.length} / 5</span>
        <span style={{ fontFamily: 'var(--font-birthday-body)', color: 'rgba(255,255,255,0.8)', fontSize: '0.62rem' }}>hearts</span>
      </div>

      {/* Desktop-only hint */}
      <style>{`@media (hover:hover) and (pointer:fine){.game-desktop-hint{display:block!important}}`}</style>
      <div className="game-desktop-hint" style={{ display: 'none', position: 'absolute', top: 12, right: 12, zIndex: 60, background: 'rgba(255,100,140,0.6)', backdropFilter: 'blur(6px)', borderRadius: 10, padding: '5px 9px', fontFamily: 'var(--font-birthday-body)', fontSize: '0.6rem', color: 'white', lineHeight: 1.7, border: '1.5px solid rgba(255,255,255,0.3)' }}>
        WASD / ↑↓←→ Move<br />SHIFT Run | E Collect
      </div>

      {/* ─── TOUCH DRAG CONTROL — full screen drag to move ─── */}
      <TouchDragControl onMove={handleJoystick} />

      {/* ─── COLLECT BUTTON — bottom right, tappable ─── */}
      <motion.button
        onTouchStart={e => { e.stopPropagation(); e.preventDefault(); if (nearHeartIdRef.current !== null) triggerCollect.current = true }}
        onClick={() => { if (nearHeartIdRef.current !== null) triggerCollect.current = true }}
        whileTap={{ scale: 0.88 }}
        style={{
          position: 'absolute',
          bottom: 'max(28px, env(safe-area-inset-bottom, 16px) + 12px)',
          right: 16, zIndex: 65,
          width: 86, height: 86, borderRadius: '50%',
          background: nearHeart !== null ? 'linear-gradient(135deg, #FF758C, #FF3D6B)' : 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(14px)',
          border: `2.5px solid ${nearHeart !== null ? 'white' : 'rgba(255,255,255,0.35)'}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
          boxShadow: nearHeart !== null ? '0 4px 32px rgba(255,117,140,0.85)' : '0 4px 18px rgba(0,0,0,0.22)',
          transition: 'all 0.3s ease',
          touchAction: 'none', WebkitTapHighlightColor: 'transparent', cursor: 'pointer',
          animation: nearHeart !== null ? 'pulse-collect 0.85s ease-in-out infinite' : 'none',
        }}>
        <span style={{ fontSize: '1.6rem' }}>❤️</span>
        <span style={{ fontFamily: 'var(--font-birthday-body)', fontSize: '0.48rem', color: nearHeart !== null ? 'white' : 'rgba(255,255,255,0.65)', fontWeight: 800, letterSpacing: '0.08em' }}>COLLECT</span>
      </motion.button>
      {/* Tooltip above collect button */}
      {nearHeart !== null && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', bottom: 'calc(max(28px, env(safe-area-inset-bottom, 16px) + 12px) + 94px)', right: 10, zIndex: 65, background: '#FF758C', borderRadius: 10, padding: '4px 10px', whiteSpace: 'nowrap', fontFamily: 'var(--font-birthday-body)', fontSize: '0.6rem', color: 'white', fontWeight: 700, pointerEvents: 'none', boxShadow: '0 4px 14px rgba(255,117,140,0.5)' }}>
          Tap to collect! ❤️
        </motion.div>
      )}
      {/* Drag hint at bottom — mobile only */}
      <style>{`
        @keyframes pulse-collect{0%,100%{box-shadow:0 4px 32px rgba(255,117,140,0.85)}50%{box-shadow:0 4px 48px rgba(255,117,140,1),0 0 0 14px rgba(255,117,140,0.15)}}
        @media (hover:hover) and (pointer:fine){.mobile-drag-hint{display:none!important}}
      `}</style>
      <div className="mobile-drag-hint" style={{ position: 'absolute', bottom: 'max(28px, env(safe-area-inset-bottom, 16px) + 12px)', left: '50%', transform: 'translateX(-50%)', zIndex: 60, fontFamily: 'var(--font-birthday-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', pointerEvents: 'none', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '4px 12px', backdropFilter: 'blur(6px)', whiteSpace: 'nowrap' }}>
        👆 Drag anywhere to move
      </div>

      {/* Heart dialogs */}
      <AnimatePresence>
        {phase === 'HEART_DIALOG' && dialogHeart && (
          <HeartDialogOverlay
            key={dialogHeart.id}
            heartType={dialogHeart.type}
            config={config}
            collectedCount={collected.length}
            onContinue={handleDialogContinue}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
