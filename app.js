const express = require('express');
const app = express();

app.use(express.json());

// Structure de données pour les utilisateurs et leurs comptes bancaires
const users = {
    "1": {
        id: "1",
        name: "John Doe",
        bankAccounts: [
            { id: "a1", label: "Compte courant", balance: 500 },
            { id: "a2", label: "Compte épargne", balance: 200 }
        ]
    },
    "2": {
        id: "2",
        name: "Jane Smith",
        bankAccounts: [
            { id: "b1", label: "Compte principal", balance: 1500 },
            { id: "b2", label: "Compte secondaire", balance: 750 }
        ]
    }
};

// Fonction de crédit
function credit(user, accountId, amount) {
    const account = user.bankAccounts.find(acc => acc.id === accountId);

    // Vérifier si le compte bancaire existe pour l'utilisateur
    if (!account) {
        return { error: 'Compte bancaire non trouvé.' };
    }

    const currentBalance = account.balance;
    const remainingAmount = Math.min(1000 - currentBalance, amount); //cette ligne per
    account.balance += remainingAmount;
    const response = {
        creditedAmount: remainingAmount,
        remainingAmount: amount - remainingAmount,
        newBalance: account.balance
    };
    return response;
}

// Fonction de débit
function debit(user, accountId, amount) {
    const account = user.bankAccounts.find(acc => acc.id === accountId);

    // Vérifier si le compte bancaire existe pour l'utilisateur
    if (!account) {
        return { error: 'Compte bancaire non trouvé.' };
    }

    const currentBalance = account.balance;
    const debitedAmount = Math.min(currentBalance, amount);
    account.balance -= debitedAmount;
    const response = {
        debitedAmount: debitedAmount,
        remainingAmount: amount - debitedAmount,
        newBalance: account.balance
    };
    return response;
}


// Route credit
app.put('/users/:id/accounts/credit', (req, res) => {
    const userId = req.params.id;
    const accountId = req.body.id;
    const amount = req.body.amount;

    // Vérifier si l'utilisateur existe
    if (!users[userId]) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const user = users[userId];
    const account = user.bankAccounts.find(acc => acc.id === accountId);

    // Vérifier si le compte bancaire existe pour l'utilisateur
    if (!account) {
        return res.status(404).json({ error: 'Compte bancaire non trouvé.' });
    }

    const response = credit(user, accountId, amount);
    res.json(response);
});

//Route debit
app.put('/users/:id/accounts/debit', (req, res) => {
    const userId = req.params.id;
    const accountId = req.body.id;
    const amount = req.body.amount;

    // Vérifier si l'utilisateur existe
    if (!users[userId]) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const user = users[userId];
    const account = user.bankAccounts.find(acc => acc.id === accountId);

    // Vérifier si le compte bancaire existe pour l'utilisateur
    if (!account) {
        return res.status(404).json({ error: 'Compte bancaire non trouvé.' });
    }

    const response = debit(user, accountId, amount);
    res.json(response);
});

// Route get user
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    // Vérifier si l'utilisateur existe
    if (!users[userId]) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const user = users[userId];
    res.json(user);
}
);

module.exports = {
    users,
    credit,
    debit
};


// Démarrez le serveur
app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000...');
});
