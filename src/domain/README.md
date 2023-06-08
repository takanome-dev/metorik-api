## Domain

La couche domaine est le noyau de l'application. Elle contient toute la logique métier et le modèle de domaine.

## Shared

Si des données sont partagés entre vos différents domaines , mettez les ici (fonctions utilitaires, types, constantes )

Un domain peut contenir ces différents dossiers :

### Entities

Les entités représentent les modèles de l'application.

### Repositories

Les repos. sont des classes qui communiquent directement avec l'API.

### Services

Les services sont des classes qui contiennent de la logique métier (validation, traitement des données...)
Ils peuvent utiliser les repos. et les entités.

### Utils

Les utils sont des fonctions qui permettent de manipuler les données explicitement lié au domaine

### Schemas

Les schemas sont des modèles de validation pour vos données.
Exemple : CreateUserSchema

### Dtos

Les dtos sont des objets qui permettent de définir le format des données.
Exemple : CreateUserDto
