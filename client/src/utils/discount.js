export function calculateItemDiscunt(price, discount1 = 0, discount2 = 0){
    if (price === undefined) {
        return 0;
    }
    // Apply first discount
    let discounterPrice = price - (price * (discount1/100));
    // Apply second discount on the already discounted price
    discounterPrice = discounterPrice - (discounterPrice * (discount2/100));

    return discounterPrice;
}

export default calculateItemDiscunt;