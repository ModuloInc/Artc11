import {useEffect, useState} from "react"
import Image from "next/image"
import anime from 'animejs';

// @ts-ignore
const SplashScreen = ({finishLoading}) => {
    const [isMounted, setIsMounted] = useState(false);

    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        })

        loader.add({
            targets: "#logo",
            delay: 0,
            scale: 1,
            duration: 500,
            easing: "easeInOutExpo",
        })
            .add({
                targets: "#logo",
                delay: 100,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 100,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 100,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 100,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })

    }

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10)
        animate()
        return () => clearTimeout(timeout)
    }, []);

    return (
        // @ts-ignore
        <div className="flex h-screen items-center justify-center">
            <Image id="logo" src="/logo.svg" alt="" width={200} height={200}/>
        </div>
    )
}

export default SplashScreen;