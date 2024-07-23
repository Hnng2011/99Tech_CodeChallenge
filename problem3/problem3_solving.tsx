{/* 
    Issue found :
    1/balances and prices maybe undefined
    2/getPriority can re-created many times
    3/sortedBalances logic is wrong
    4/sortedBalances can be error when balances is undefined
    5/blockchain is not define in WalletBalance
    6/formattedBalances does not using instead of sortedBalances for row
*/}


interface WalletBalance {
    currency: string;
    blockchain: string;
    amount: number;
}

//FormattedWalletBalance extends WalletBalance because it WalletBalance with formatted variable so when WalletBalance it can change too
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends BoxProps {
    children: ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;

    //Defining Type for balances and prices for handling result and can know the type when coding
    const balances: WalletBalance[] | undefined = useWalletBalances();
    const prices: Record<string, number | undefined> = usePrices();

    //Using useCallback because the function don't need to be recreate so can improve performance, or we can move it outside
    const getPriority = useCallback((blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100;
            case 'Ethereum':
                return 50;
            case 'Arbitrum':
                return 30;
            case 'Zilliqa':
                return 20;
            case 'Neo':
                return 20;
            default:
                return -99;
        }
    }, []);


    //using useMemo to increase performance and update dependency getPriority
    const sortedBalances: WalletBalance[] = useMemo(() => {
        // Make default values when balances is undefined
        return balances?.filter((balance) => {
            //Using balancePriority instead lhsPriority and return when both balancePriority > -99 and balance.amount > 0
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount > 0;
        }).sort((lhs, rhs) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return leftPriority > rightPriority ? -1 : leftPriority === rightPriority ? 0 : 1;
        }) || [];
    }, [balances, getPriority]);


    //using useMemo to increase performance
    const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
        return sortedBalances.map((balance) => ({
            ...balance,
            formatted: balance.amount.toFixed()
        }));
    }, [sortedBalances]);


    const rows = useMemo(() => {
        return formattedBalances.map((balance, index) => {
            // Make default values when prices is undefined
            const usdValue = prices?.[balance.currency] !== undefined ? prices[balance.currency]! * balance.amount : 0;
            return (
                <WalletRow
                    className={classes.row} // Đảm bảo 'classes' được định nghĩa trong component
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        });
    }, [formattedBalances, prices]);

    return (
        <div {...rest}>
            {rows}
            {/* children defined but unused */}
            {children}
        </div>
    );
}

