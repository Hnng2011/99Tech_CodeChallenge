import { useEffect, useReducer } from "react";
import { Modal } from "@/components/ui/modal";
import { importSVG } from "@/utils/importSVG";
import Selector from "./selector";
import { cn } from "@/utils/cn";


const ChainSelectorState: { openModal: boolean, filter?: string, filterChain?: Token[], svgLoaded: Record<string, string>, currentSVG: string } = {
    openModal: false,
    filter: "",
    filterChain: [],
    svgLoaded: {},
    currentSVG: ""
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function chainSelectorReducer(state: { openModal: boolean, filter?: string, filterChain?: Token[], svgLoaded: Record<string, string>, currentSVG: string }, action: any) {
    switch (action.type) {
        case "OPEN_MODAL":
            return { ...state, openModal: true };
        case "CLOSE_MODAL":
            return { ...state, openModal: false };
        case "LOAD_SVGS":
            return { ...state, svgLoaded: action.svgLoaded };
        case "LOAD_CHAIN":
            return { ...state, filterChain: action.chains };
        case "FILTER":
            return { ...state, filter: action.filter };
        case "SET_CURRENT_SVG":
            return { ...state, currentSVG: action.current };
        default:
            return state;
    }
}


export default function ChainSelector({ chains, currentChain, click }: ChainSelectorProps) {
    const [state, dispatch] = useReducer(chainSelectorReducer, ChainSelectorState);

    useEffect(() => {
        const loadSVGs = async () => {
            const loadedSvgs: Record<string, string> = {};
            for (const chain of chains) {
                const svg = await importSVG(chain.currency);
                if (svg) {
                    loadedSvgs[chain.currency] = svg;
                }

                if (currentChain?.currency === chain.currency) {
                    dispatch({ type: "SET_CURRENT_SVG", current: svg });
                }
            }

            dispatch({ type: "LOAD_SVGS", svgLoaded: loadedSvgs });
        };

        loadSVGs();
    }, [chains, currentChain]);

    useEffect(() => {
        dispatch({ type: "LOAD_CHAIN", chains });
    }, [chains]);

    useEffect(() => {
        if (state.filter !== "") {
            const filteredChains = chains.filter(chain =>
                chain.currency.toLowerCase().includes(state.filter.toLowerCase()));
            dispatch({ type: "LOAD_CHAIN", chains: filteredChains });
        }
        else {
            dispatch({ type: "LOAD_CHAIN", chains: chains });
        }
    }, [state.filter]);

    return (
        <>
            <button
                type="button"
                className={cn(
                    "flex pl-1 pr-3 h-11 items-center justify-center gap-3 flex-shrink-0 text-white font-bold border-slate-700 border-2 rounded-full  duration-300",
                    currentChain ? ' hover:bg-slate-700' : 'bg-slate-700 hover:bg-slate-500 hover:border-slate-500'
                )}
                onClick={() => dispatch({ type: "OPEN_MODAL" })}
            >
                {currentChain?.currency && (
                    <img className="h-8 w-8" src={state.currentSVG} alt={currentChain?.currency} />
                )}
                {currentChain?.currency || "Select a Token"}
            </button>

            {state.openModal && (
                <Modal requestClose={() => dispatch({ type: "CLOSE_MODAL" })}>
                    <div className="grid grid-cols-2">
                        <input
                            className="col-span-2 px-2 font-black h-12 focus:outline-none rounded mb-8"
                            placeholder="Search"
                            value={state.filter}
                            onChange={(e) => dispatch({ type: "FILTER", filter: e.target.value })}
                        />

                        {state.filterChain?.map((chain: Token, idx: number) => (
                            <Selector
                                key={idx}
                                chain={chain}
                                src={state.svgLoaded[chain.currency] || ""}
                                click={(token, price) => {
                                    click && click(token, price);
                                    dispatch({ type: "CLOSE_MODAL" });
                                }}
                            />
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
}