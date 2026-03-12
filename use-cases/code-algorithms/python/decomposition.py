def calculate_total(price, tax_rate, discount):
    """Separating concerns: logic decomposition"""
    subtotal = apply_discount(price, discount)
    return apply_tax(subtotal, tax_rate)

def apply_discount(price, discount):
    return price * (1 - discount)

def apply_tax(amount, tax_rate):
    return amount * (1 + tax_rate)
