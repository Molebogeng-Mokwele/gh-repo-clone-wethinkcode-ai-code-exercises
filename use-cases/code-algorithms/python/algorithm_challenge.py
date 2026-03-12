def filter_high_value_orders(orders, threshold):
    """
    Algorithm: Extract orders above a price threshold 
    and format the labels for a report.
    """
    return [
        {"id": o['id'], "label": f"VALUED-${o['price']}"}
        for o in orders
        if o.get('price', 0) > threshold
    ]
