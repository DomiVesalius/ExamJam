# Piazza Scripts

## Retrieving Piazza Posts

- This script scrapes all post data for provided piazza forums
- It requires the user to provide (inside the script):
  - Their cookies which can be found by logging into their piazza account and opening the storage tab under inspect element
  - The id of the forum to be scraped
    - Ex: For the following url `https://piazza.com/class/lc2onqw5fuz6h5`, the id would be the last portion `lc2onqw5fuz6h5`
- Provide the above items in the format that the script follows.
- Also ensure that MongoDB is running otherwise it will not work.
