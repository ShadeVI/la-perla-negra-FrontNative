> **Convention for Naming Branches and Commits in Git**

<br>

# 1. Branch Naming Convention 

`git branch <category/reference/description-in-kebab-case>`

## Category

`feature` is for adding, refactoring or removing a feature.

`bugfix` is for fixing a bug.

`hotfix` is for changing code with a temporary solution and/or without following the usual process (usually because of an emergency).

`test` is for experimenting outside of an issue/ticket.

## Reference

The reference of the **issue/ticket** you are working on.

If there's no reference, just add **no-ref**.

## Description:

By default, you can use the `title of the issue/ticket` you are working on.

Just replace any special character by "-" and use **kebab-case**.

### Examples:
`git branch feature/issue-42/create-new-button-component`

`git branch bugfix/issue-342/button-overlap-form-on-mobile`

`git branch hotfix/no-ref/registration-form-not-working`

`git branch test/no-ref/refactor-components-with-atomic-design`



<br><br>
# 2. Commit Naming Convention 

`git commit -m <category: do something; do some other things>`

## Category

`feat` is for adding a new feature.

`fix` is for fixing a bug.

`refactor` is for changing code for peformance or convenience purpose (e.g. readibility).

`chore` is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)

After the category, there should be a ":" announcing the commit description. 

## Statement(s) 

After the colon, the commit description should consist in short statements describing the changes.

Each statement should start with a verb conjugated in an imperative way. Statements should be seperated from themselves with a ";".

### Examples:

git commit -m 'feat: add new button component; add new button components to templates'

git commit -m 'fix: add the stop directive to button component to prevent propagation'

git commit -m 'refactor: rewrite button component in TypeScript'

git commit -m 'chore: write button documentation'

<br><br>

### References 

#### Source
https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4