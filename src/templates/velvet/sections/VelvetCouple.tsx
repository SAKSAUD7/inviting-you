'use client'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

const GarlandDivider = () => (
  <svg className="velvet-couple__garland" viewBox="0 0 900 80" fill="none" aria-hidden="true">
    <path d="M0 60 Q450 10 900 40" stroke="#8B1A1A" strokeWidth="2" fill="none" opacity="0.25"/>
    {[60,150,250,350,450,550,650,750,840].map((x,i)=>(
      <g key={i} transform={`translate(${x},${38+(i%3)*8})`}>
        <circle r={i%2===0?13:9} fill={i%3===0?'#8B1A1A':'#6B1010'} opacity="0.82"/>
        <circle r={i%2===0?7:5} fill="#A02020" opacity="0.7"/>
        <circle r={i%2===0?3:2} fill="#C03030" opacity="0.6"/>
      </g>
    ))}
    {[30,120,220,320,400,500,600,700,800,880].map((x,i)=>(
      <g key={i} transform={`translate(${x},${48+(i%2)*6})`}>
        <ellipse rx="6" ry="3" fill="#C9971A" opacity="0.5" transform={`rotate(${i%2===0?30:-30})`}/>
      </g>
    ))}
  </svg>
)

export default function VelvetCouple({ couple }: Props) {
  if (!couple) return null
  const brideFn = couple.brideName.split(' ')[0]
  const groomFn = couple.groomName.split(' ')[0]

  return (
    <section className="velvet-couple">
      <GarlandDivider />
      <div className="reveal-hidden stagger-children">
        <span className="velvet-couple__bride">{brideFn}</span>
        <span className="velvet-couple__amp">&amp;</span>
        <span className="velvet-couple__groom">{groomFn}</span>
      </div>
    </section>
  )
}
