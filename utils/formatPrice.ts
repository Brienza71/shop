export const formatPrice = (amount: number) =>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
};