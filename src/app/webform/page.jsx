import dynamic from 'next/dynamic'
const Leadform = dynamic(() => import('./components/Leadform'), { ssr: false })

const webform = () => {
    return (
        <>
          <Leadform />
        </>    
    )
}

export default webform
