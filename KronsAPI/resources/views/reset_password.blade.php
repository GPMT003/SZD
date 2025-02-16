<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiók sikeresen létrehozva</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Fiók sikeresen létrehozva</h2>
        <p>Kedves Felhasználó,</p>
        <p>Örömmel értesítjük, hogy a fiókod sikeresen létrejött. Most már hozzáférhetsz az összes funkcióhoz, és elkezdheted a használatát.</p>
        
        <p>Az automatikusan generált jelszavad: <strong>{{ $password }}</strong></p>

        <p>Ha szeretnéd módosítani a jelszavad, kattints az alábbi linkre:</p>
        <p>
            <a href="{{ $resetLink }}" style="display: inline-block; padding: 10px 20px; color: #fff; background: #007bff; text-decoration: none; border-radius: 4px;">Jelszó módosítása</a>
        </p>
        <p>Ez a link 30 percig érvényes.</p>
        <p>Ha bármilyen kérdésed van, ne habozz kapcsolatba lépni velünk.</p>
        <p>Üdvözlettel,<br>A KRONS csapata</p>
    </div>
</body>
</html>