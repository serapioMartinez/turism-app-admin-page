
export const pokeAPIAddress   = "https://pokeapi.co/api/v2/pokemon/";
export const turismAppAPI     = "http://localhost:9091/";
export const loginPath        = "api/auth/public/login";
export const userisloggedPath = "api/auth/isUserLogged";
export const registrationPath = "api/auth/public/register"
export const logoutPath       = "api/auth/logout"
export const refreshTokenPath = "api/auth/public/refreshToken"

//Ciudad endpoints
export const userCityPath     = "api/ciudad"
export const cityOperations = {
    "postUserCity": "api/ciudad",
    'characterOperations': {
        'userCityCharactersPath': 'api/ciudad/personajes',
        'postCharacter':          'api/ciudad/personajes'
    },
    'mealOperations':{
        'getUserCityMeals': 'api/ciudad/platillos',
        'postCityMeal': 'api/ciudad/platillos'
    },'placeOperations':{
        'getCityPlaces': 'api/ciudad/zonas',
        'postCityPlace': 'api/ciudad/zonas'
    }
};
