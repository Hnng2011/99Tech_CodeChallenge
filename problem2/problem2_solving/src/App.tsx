import { AuroraBackground } from '@/components/ui/aurora_background'
import { motion } from "framer-motion";
import SwapPage from '@/pages/swap'

function App() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="container"
      >
        <SwapPage />
      </motion.div>
    </AuroraBackground>
  )
}

export default App
