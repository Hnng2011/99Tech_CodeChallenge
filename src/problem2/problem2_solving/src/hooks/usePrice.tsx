import { useCallback, useState, useEffect, useMemo } from "react";

export default function usePrice() {
    const [data, setData] = useState<Token[]>([]);
    const [needFetching, setNeedFetching] = useState(false);

    const getPrice = useCallback(async () => {
        try {
            const response = await fetch("https://interview.switcheo.com/prices.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
            setNeedFetching(false);
        } catch (e) {
            setData([]);
            setNeedFetching(true);
        }
    }, [needFetching]);

    useEffect(() => {
        data.length <= 0 && setNeedFetching(true)

        needFetching && getPrice();
    }, [needFetching]);

    const price: Token[] = useMemo(() => { return data }, [data])

    return price
}
