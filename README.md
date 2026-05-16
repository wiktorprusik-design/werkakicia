# Romantyczna strona-niespodzianka

To statyczna strona HTML/CSS/JavaScript, więc działa bez backendu, bez płatnych bibliotek i nadaje się bezpośrednio na GitHub Pages.

## Jak uruchomić lokalnie

Najprościej otwórz plik `index.html` w przeglądarce.

Możesz też uruchomić prosty lokalny serwer w katalogu projektu, jeśli masz Pythona:

```bash
py -m http.server 5173
```

Potem wejdź na:

```text
http://localhost:5173
```

## Gdzie wkleić zdjęcia

Wklej swoje zdjęcia do folderu `images` i nazwij je dokładnie:

```text
images/photo1.jpg
images/photo2.jpg
images/photo3.jpg
images/photo4.jpg
```

W kodzie `index.html` są komentarze przy każdym zdjęciu, więc łatwo znajdziesz miejsca do podmiany. Jeśli zdjęć jeszcze nie ma, strona pokaże eleganckie placeholdery.

## Muzyka

Opcjonalny plik muzyczny dodaj tutaj:

```text
assets/music.mp3
```

Muzyka uruchamia się dopiero po kliknięciu przycisku `Muzyka`, żeby przeglądarka jej nie blokowała.

## Jak zmienić teksty

Najważniejsze teksty i wierszyki są w pliku `index.html`. Przy sekcjach dodałem komentarze, gdzie możesz zmienić treść.

## Publikacja na GitHub Pages

1. Utwórz nowe repozytorium na GitHubie.
2. Wgraj do niego wszystkie pliki z tego folderu.
3. Wejdź w `Settings` -> `Pages`.
4. W sekcji `Build and deployment` wybierz:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - folder: `/ (root)`
5. Zapisz ustawienia i poczekaj chwilę, aż GitHub wygeneruje link do strony.

## Pliki w projekcie

```text
index.html
styles.css
script.js
favicon.svg
README.md
images/
assets/
```
