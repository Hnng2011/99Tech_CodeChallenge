export default function Selector({ chain, src, click }: { chain: Token, src: string, click: (token: string, price: number) => void }) {
    return (
        <button onClick={() => click(chain.currency, chain.price)} className="flex h-16 p-2 mb-4 items-center text-white w-full hover:bg-gray-400 hover:bg-opacity-45 rounded">
            <div className="flex gap-4 items-center">
                <img src={src} alt={chain.currency} className="w-10 h-10" />
                <span className="font-black">{chain.currency}</span>
            </div>
        </button>
    )
}