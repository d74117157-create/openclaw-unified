"""Paper Trading Module"""
class PaperTrading:
    def __init__(self, initial_balance: float = 10000.0):
        self.balance = initial_balance
        self.positions = {}
        self.trades = []

    def buy(self, symbol: str, quantity: float, price: float):
        cost = quantity * price
        if cost > self.balance:
            return {"error": "Insufficient balance"}
        self.balance -= cost
        self.positions[symbol] = self.positions.get(symbol, 0) + quantity
        self.trades.append({"type": "buy", "symbol": symbol, "quantity": quantity, "price": price})
        return {"balance": self.balance, "position": self.positions[symbol]}

    def sell(self, symbol: str, quantity: float, price: float):
        if self.positions.get(symbol, 0) < quantity:
            return {"error": "Insufficient position"}
        proceeds = quantity * price
        self.balance += proceeds
        self.positions[symbol] -= quantity
        self.trades.append({"type": "sell", "symbol": symbol, "quantity": quantity, "price": price})
        return {"balance": self.balance, "position": self.positions.get(symbol, 0)}
