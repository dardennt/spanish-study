async function fetchConjugations() {
    try {
        const response = await fetch('./assets/json/conjugations.json');
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des conjugaisons:', error);
        return [];
    }
}