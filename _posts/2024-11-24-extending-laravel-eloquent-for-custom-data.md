---
layout: post
title: "Extending Laravel Eloquent with Custom Relations: A Complete Guide"
excerpt: "Laravel's Eloquent ORM is powerful, offering various relationship types (hasOne, belongsTo, etc.). However, sometimes your data isn't stored in a database, such as when you're dealing with APIs, static arrays, or non-traditional data sources. In these cases, you can extend Eloquent with custom relations."
author: 
date: 2024-11-24
categories: [php, laravel, eloquent, extend]
tags: [laravel, php]
pin: true
keywords: [extend, model, php, eloquent]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

Laravel's Eloquent ORM is powerful, offering various relationship types (`hasOne`, `belongsTo`, etc.). However, sometimes your data isn't stored in a database, such as when you're dealing with **APIs, static arrays, or non-traditional data sources**. In these cases, you can extend Eloquent with **custom relations**.

This article will guide you through creating a custom relation, with detailed explanations of how methods like `getResults` and `match` work.


## **What Are Custom Relations?**

A custom relation allows you to define how related data is retrieved for a model. By extending `Illuminate\Database\Eloquent\Relations\Relation`, you can mimic the behavior of Eloquent relationships for non-standard data sources.


## **When to Use Custom Relations**

- Data is fetched from **APIs** or **external services**.
- Relationships are based on **static arrays** or other **non-database sources**.
- You need to **maintain the consistency of Eloquent's interface** (e.g., lazy loading, eager loading).


## **Steps to Create a Custom Relation**

### 1. **Create the Relation Class**
We'll create a class that extends `Relation` and implements the necessary methods.

### 2. **Implement Core Methods**
To comply with Laravel's expectations, we'll implement the following:
- `getResults`: Fetches the related data for lazy loading.
- `match`: Matches the related data to a parent model during eager loading.

### 3. **Use the Custom Relation**
Integrate the custom relation into your model.


## **Complete Example: Static Array Relation**

Let’s assume we have a `User` model and we want to link it to a "profile" stored in a static array.

 **Static Data**
```php
// Static profiles
private static $profiles = [
    1 => ['id' => 1, 'name' => 'John Doe', 'user_id' => 1],
    2 => ['id' => 2, 'name' => 'Jane Doe', 'user_id' => 2],
];
```

### **Step 1: Create the Custom Relation**
```php
namespace App\Relations;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class StaticArrayRelation extends Relation
{
    protected $relatedData;

    public function __construct($parent, $relatedData)
    {
        parent::__construct($parent->newQuery(), $parent);
        $this->relatedData = $relatedData;
    }

    /**
     * Get results for lazy loading.
     */
    public function getResults()
    {
        // Return related data for lazy loading
        return $this->relatedData ? (object) $this->relatedData : null;
    }

    /**
     * Match related data to parent models for eager loading.
     */
    public function match(array $models, Collection $results, $relation)
    {
        foreach ($models as $model) {
            // Find related data for the parent model
            $relatedData = collect($this->relatedData)->firstWhere('user_id', $model->id);

            // Attach related data to the model
            $model->setRelation($relation, $relatedData ? (object) $relatedData : null);
        }

        return $models;
    }

    /**
     * Initialize the relation on a collection of models.
     */
    public function initRelation(array $models, $relation)
    {
        foreach ($models as $model) {
            $model->setRelation($relation, null);
        }

        return $models;
    }

    /**
     * Add constraints for lazy loading (not needed for static data).
     */
    public function addConstraints() {}

    /**
     * Add constraints for eager loading (not needed for static data).
     */
    public function addEagerConstraints(array $models) {}
}
```

### **Step 2: Add Relation to the `User` Model**
In your `User` model, define the relationship method:

```php
use App\Relations\StaticArrayRelation;

class User extends Model
{
    private static $profiles = [
        1 => ['id' => 1, 'name' => 'John Doe', 'user_id' => 1],
        2 => ['id' => 2, 'name' => 'Jane Doe', 'user_id' => 2],
    ];

    public function profile()
    {
        $userId = $this->id;
        $profileData = collect(self::$profiles)->firstWhere('user_id', $userId);

        return new StaticArrayRelation($this, $profileData);
    }
}
```

-------


## **How the Core Methods Work**

`match` and `getResults`

---

### **1. `getResults`**
- **When it is called:** 
  - This method is invoked during **lazy loading** when you access the relationship as a property (e.g., `$user->profile`).
  - It retrieves the related data for the specific parent model.

- **Execution order:**
  - Happens first when the relationship is accessed lazily.

#### **Example: Lazy Loading**
```php
$user = User::find(1);
$profile = $user->profile; // Calls `getResults`.
```

- **Execution flow:**
  1. The `getResults` method is executed when you try to access `$user->profile`.
  2. It retrieves the related data for the specific user.

---

### **2. `match`**
- **When it is called:** 
  - This method is invoked during **eager loading** when you pre-load relationships using `with()` (e.g., `User::with('profile')->get()`).
  - It matches the related data to each parent model in a collection after the related data has been fetched.

- **Execution order:**
  - Happens **after** `addEagerConstraints` and the related data is fetched. `match` is used to attach the related data to the parent models.

#### **Example: Eager Loading**
```php
$users = User::with('profile')->get(); // Calls `match`.
```

- **Execution flow:**
  1. Laravel calls `addEagerConstraints` to apply constraints for fetching the related data (if applicable).
  2. The related data is fetched (e.g., using `getResults` or a query in a typical relationship).
  3. The `match` method is executed to attach the fetched related data to each parent model.

---

### **Illustrative Example**
Let’s see this in action with both lazy and eager loading.

#### Lazy Loading Example
```php
$user = User::find(1); // Fetch the user model
$profile = $user->profile; // Calls `getResults` to fetch the related data
```

- **What happens:**
  - The `getResults` method is called to retrieve the profile for the specific user.
  - No `match` method is involved since there's no collection to match.

---

#### Eager Loading Example
```php
$users = User::with('profile')->get(); // Fetch all users with profiles
```

- **What happens:**
  1. `addEagerConstraints` is called to prepare constraints for eager loading (if applicable).
  2. The related profiles are fetched.
  3. The `match` method is called to attach the fetched profiles to their respective users in the collection.


## Execution Flow Summary:

| **Scenario**       | **Method Execution Order**                                 | **Explanation**                                       |
|--------------------|------------------------------------------------------------|-------------------------------------------------------|
| **Lazy Loading**    | 1. `getResults`                                            | Fetches related data for a single model.              |
| **Eager Loading**   | 1. `addEagerConstraints` <br> 2. Fetch related data <br> 3. `match` | Fetches and assigns related data to multiple models. |

---

### Summary of Key Points:
- **`getResults`:** Called for **lazy loading** when accessing a relationship on a single parent model.
- **`match`:** Called for **eager loading** to attach related data to a collection of parent models.
- **Execution Order:** `getResults` happens immediately upon lazy access, while `match` happens after fetching data during eager loading.


### **Advantages of Custom Relations**
1. Consistency with Eloquent’s interface (`with`, lazy loading, etc.).
2. Flexibility to integrate non-database data sources.
3. Eager and lazy loading work seamlessly.

---

### **Limitations**
1. **No Query Scopes:** Query builder methods like `where` or `orderBy` are not applicable unless explicitly implemented.
2. **Performance Concerns:** Static data relations may not scale well for large datasets.

---

### **Conclusion**

Custom relations in Laravel give you the flexibility to handle non-standard data sources while maintaining Eloquent's functionality. By implementing the `getResults` and `match` methods correctly, you can ensure smooth integration with both lazy and eager loading.

Keep Coding! 😊

## Reference


* 1 [Relation Class in Laravel Source Code:](https://github.com/laravel/framework/blob/10.x/src/Illuminate/Database/Eloquent/Relations/Relation.php) This file defines the Relation class, where you'll see addConstraints, addEagerConstraints, match, and other essential methods.
