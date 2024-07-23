export const Noise = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full transform opacity-5 [mask-image:radial-gradient(#fff,transparent,75%)] z-0 pointer-events-none rounded-lg"
            style={{
                backgroundImage: "url('../../../public/assets/img/noise.webp",
                backgroundSize: "30%",
            }}
        ></div>
    );
};