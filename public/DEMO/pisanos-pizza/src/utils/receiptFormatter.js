/**
 * Formats the cart and customer details into a printable receipt string.
 * This string will be the body of the email sent to the cloud printer.
 */
export const formatReceipt = (cart, customer, total) => {
    const date = new Date().toLocaleString();

    let receipt = `
================================
       PISANOS PIZZA
        ONLINE ORDER
================================
Date: ${date}

CUSTOMER:
Name:  ${customer.name}
Phone: ${customer.phone}
Notes: ${customer.notes || "None"}

--------------------------------
ITEMS:
`;

    cart.forEach(item => {
        receipt += `
${item.quantity}x ${item.name} (${item.size})
   Price: $${(item.price * item.quantity).toFixed(2)}
`;
        if (item.selectedToppings) {
            receipt += `   + Toppings: ${item.selectedToppings.split(',').join(', ')}\n`;
        }
    });

    receipt += `
--------------------------------
Subtotal: $${(total / 1.08).toFixed(2)}
Tax:      $${(total - (total / 1.08)).toFixed(2)}
================================
TOTAL:    $${total.toFixed(2)}
================================
    `;

    return receipt;
};
