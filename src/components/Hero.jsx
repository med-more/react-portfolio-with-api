import {HERO} from "../constants"
import carlImg from "../assets/medport.jpeg"
import { motion } from "framer-motion"
const Hero = () => {
  return (
    <section className="flex min-h-screen flex-wrap items-center">
        <motion.div
        initial = {{opacity:0, x:-50}}
        animate = {{opacity: 1, x:0}}
        transition={{duration:1}}
         className="w-full md:w-1/2">
            <h2 className="my-8 p-2 text-4xl font-bold md:text-5xl lg:text[7rem]">
                {HERO.name}
            </h2>
            <p className="p-2 text-3xl tracking-tighter lg:text-4xl">
                {HERO.greet}
            </p>
            <p className="mb-8 p-2 text-xl">
                {HERO.description}
            </p>
        </motion.div>
        <motion.div 
        initial ={{opacity: 0, scale: 0.8}}
        animate ={{opacity: 1, scale:1}}
        transition={{duration:1}}
        className="w-full mt-8 md:w-1/2 lg:p-8">
            <div className="flex justify-center">
                <motion.img
                 animate={{
                    y: [0, -10, 0], // Moves up and down
                    rotate: [0, 2, -2, 0], // Slight rotation effect
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                /* initial= {{opacity:0}} */
               /*  animate={{opacity:1}}
                transition={{duration:1}} */
                 src={carlImg} width={400} height={400} alt="med image" className="rounded-full border-2 border-blue-800 shadow-lg shadow-red-500/50" />
            </div>
        </motion.div>
    </section>
  )
}

export default Hero
