const { credit, debit, users } = require('../app')

describe('Endpoints de crédit et de débit', () => {
    test('Crédit d\'un compte', () => {
        const user = users['1'];
        const accountId = 'a1';
        const amount = 200;

        const response = credit(user, accountId, amount);

        expect(response).toHaveProperty('creditedAmount', 200);
        expect(response).toHaveProperty('remainingAmount', 0);
        expect(response).toHaveProperty('newBalance', 20);
    });

    test('Débit d\'un compte', () => {
        const user = users['1'];
        const accountId = 'a2';
        const amount = 100;

        const response = debit(user, accountId, amount);

        expect(response).toHaveProperty('debitedAmount', 100);
        expect(response).toHaveProperty('remainingAmount', 0);
        expect(response).toHaveProperty('newBalance', 100);
    });
});
