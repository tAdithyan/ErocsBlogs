import { format } from "morgan";

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "User Registration API",
      version: "1.0.0",
      description: "API for user registration."
    },
    paths: {
      "/register": {
        post: {
          summary: "Register a new user",
          description: "Creates a new user account with the provided details.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "full_name",
                    "email",
                    "password"
                  ],
                  properties: {
                    email: { type: "string", format: "email", example: "johndoe@example.com" },
                    password: { type: "string", format: "password", example: "Password123!" },
                    is_active: { type: "boolean", default: true }
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "User registered successfully." }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Validation errors",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      errors: {
                        type: "array",
                        items: { type: "string" },
                        example: ["Email is required.", "Password must be at least 8 characters long."]
                      }
                    }
                  }
                }
              }
            },
            "409": {
              description: "Duplicate key error (e.g., email already in use)",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      errors: {
                        type: "array",
                        items: { type: "string" },
                        example: ["The email \"johndoe@example.com\" is already in use."]
                      }
                    }
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Internal server error." }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/login": {
        post: {
          summary: " login user",
          description: "login user.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "full_name",
                    "email",
                    "password"
                  ],
                  properties: {
                    email: { type: "string", format: "email", example: "johndoe@example.com" },
                    password: { type: "string", format: "password", example: "Password123!" },
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "User login successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "User login successfully." }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Validation errors",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      errors: {
                        type: "array",
                        items: { type: "string" },
                        example: ["Email is required.", "Password must be at least 8 characters long."]
                      }
                    }
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Internal server error." }
                    }
                  }
                }
              }
            }
          }
        }
      },
   "/refreshToken": {
  post: {
    summary: "Refresh the access token using a refresh token",
    description: "This endpoint allows the user to refresh their access token by providing a valid refresh token.",
    tags: ["Auth"],
    requestBody: {
      required: false,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              refreshToken: {
                type: "string",
                description: "The refresh token used to refresh the access token."
              }
            },
            example: {
              refreshToken: "your_refresh_token_here"
            }
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Successfully refreshed access token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  description: "The new access token."
                }
              },
              example: {
                accessToken: "new_access_token_here"
              }
            }
          }
        }
      },
      "401": {
        description: "Refresh token not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Refresh token not found"
                }
              }
            }
          }
        }
      },
      "403": {
        description: "Invalid refresh token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Invalid refresh token"
                }
              }
            }
          }
        }
      },
      "500": {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Internal server error."
                }
              }
            }
          }
        }
      }
    }
  }
},
"/createCategory": {
  post: {
    tags: ["Category"],
    summary: "Create a new category with image upload",
    consumes: ["multipart/form-data"],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Electronics",
              },
              discription: {
                type: "string",
                example: "Devices and gadgets",
              },
              image: {
                type: "string",
                format: "binary",
              },
            },
            required: ["name"]
          },
        },
      },
    },
    responses: {
      201: {
        description: "Category created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category created successfully",
                },
                category: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    discription: { type: "string" },
                    Image: { type: "string" },
                    is_active: { type: "boolean" },
                    is_delete: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
},
"/getCategory": {
  get: {
    tags: ["Category"],
    summary: "Get all categories",
    description: "Returns a list of all categories including image filename and URL",
    responses: {
      200: {
        description: "Category fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category fetched successfully"
                },
                response: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: { type: "string", example: "661168bb71a93061fbf21ec4" },
                      name: { type: "string", example: "Laptops" },
                      discription: { type: "string", example: "Electronics category" },
                      Image: { type: "string", example: "1712233921083-apple-macbook.png" },
                      imageUrl: { type: "string", example: "http://localhost:5000/uploads/1712233921083-apple-macbook.png" },
                      is_active: { type: "boolean", example: true },
                      is_delete: { type: "boolean", example: false }
                    }
                  }
                }
              }
            }
          }
        }
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Something went wrong" },
                error: { type: "string", example: "Internal Server Error" }
              }
            }
          }
        }
      }
    }
  }
},
"/updateCategory/{id}": {
  put: {
    tags: ["Category"],
    summary: "Update category by ID",
    description: "Update the name, description, and optionally the image of a category.",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        },
        description: "The ID of the category to update"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Updated Category Name"
              },
              discription: {
                type: "string",
                example: "Updated description"
              },
              image: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Category updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category updated successfully"
                },
                category: {
                  type: "object",
                  properties: {
                    _id: { type: "string", example: "661168bb71a93061fbf21ec4" },
                    name: { type: "string", example: "Updated Category" },
                    discription: { type: "string", example: "Updated description" },
                    Image: { type: "string", example: "updated-image.png" },
                    imageUrl: { type: "string", example: "http://localhost:5000/uploads/updated-image.png" },
                    is_active: { type: "boolean", example: true },
                    is_delete: { type: "boolean", example: false }
                  }
                }
              }
            }
          }
        }
      },
      404: {
        description: "Category not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category not found"
                }
              }
            }
          }
        }
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Something went wrong" },
                error: { type: "string", example: "Internal Server Error" }
              }
            }
          }
        }
      }
    }
  }
},
"/deleteCategory/{id}": {
  delete: {
    tags: ["Category"],
    summary: "Delete category by ID",
    description: "Deletes a category by its ID and also removes its image from the uploads folder.",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        },
        description: "The ID of the category to delete"
      }
    ],
    responses: {
      200: {
        description: "Category deleted successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category deleted successfully"
                }
              }
            }
          }
        }
      },
      404: {
        description: "Category not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Category not found"
                }
              }
            }
          }
        }
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Something went wrong" },
                error: { type: "string", example: "Internal Server Error" }
              }
            }
          }
        }
      }
    }
  }
},
"/createArticles": {
  "post": {
    "tags": ["Articles"],
    "summary": "Create a new article",
    "description": "Creates a new article with title, author, category, description, and optional image.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "required": ["title", "author", "category", "description"],
            "properties": {
              "title": {
                "type": "string",
                "example": "How to Build a Robot"
              },
              "author": {
                "type": "string",
                "description": "MongoDB ObjectId of the user",
                "example": "661012ab7c349dbb8d05e12a"
              },
              "category": {
                "type": "string",
                "description": "MongoDB ObjectId of the category",
                "example": "661013cd7c349dbb8d05e12b"
              },
              "description": {
                "type": "string",
                "example": "This article explains how to build a robot from scratch."
              },
              "image": {
                "type": "string",
                "format": "binary",
                "description": "Image file to be uploaded"
              }
            }
          }
        }
      }
    },
    "responses": {
      "201": {
        "description": "Article created successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article created successfully"
                },
                "article": {
                  "$ref": "#/components/schemas/Article"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Author or category not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Author not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/getAllArticles": {
  "get": {
    "tags": ["Articles"],
    "summary": "Get all articles (with optional filters)",
    "description": "Fetches all articles. You can filter results by userId (author) and/or categoryId.",
    "parameters": [
      {
        "name": "userId",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        },
        "description": "Filter articles by the author's user ID"
      },
      {
        "name": "categoryId",
        "in": "query",
        "required": false,
        "schema": {
          "type": "string"
        },
        "description": "Filter articles by category ID"
      }
    ],
    "responses": {
      "200": {
        "description": "List of articles",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ArticlePopulated"
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Some error message here"
                }
              }
            }
          }
        }
      }
    }
  }
}
,
"/getArticles/{id}": {
  "get": {
    "tags": ["Articles"],
    "summary": "Get article by ID",
    "description": "Fetches a single article by its ID with populated author (email) and category (name).",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "ID of the article to fetch"
      }
    ],
    "responses": {
      "200": {
        "description": "Article found successfully",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ArticlePopulated"
            }
          }
        }
      },
      "404": {
        "description": "Article not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Cast to ObjectId failed"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/updateArticles/{id}": {
  "put": {
    "tags": ["Articles"],
    "summary": "Update article by ID",
    "description": "Updates an article by its ID. Supports updating title, author, category, description, and image.",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "ID of the article to update"
      }
    ],
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "example": "Updated Article Title"
              },
              "author": {
                "type": "string",
                "example": "660eaf9c04d3f985d7d213e3"
              },
              "category": {
                "type": "string",
                "example": "660eb09104d3f985d7d213e5"
              },
              "description": {
                "type": "string",
                "example": "Updated description of the article"
              },
              "image": {
                "type": "string",
                "format": "binary"
              }
            }
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Article updated successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article updated successfully"
                },
                "article": {
                  "$ref": "#/components/schemas/ArticlePopulated"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Article not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/deleteArticles/{id}": {
  "delete": {
    "tags": ["Articles"],
    "summary": "Delete article by ID",
    "description": "Deletes an article by its ID and removes the associated image from the server.",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The ID of the article to delete"
      }
    ],
    "responses": {
      "200": {
        "description": "Article deleted successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article deleted successfully"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Article not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/publishArticles/{id}": {
  "put": {
    "tags": ["Articles"],
    "summary": "Publish an article by ID",
    "description": "Marks an article as published by setting `is_published` to `true`.",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "ID of the article to publish"
      }
    ],
    "responses": {
      "200": {
        "description": "Article published successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article published successfully"
                },
                "article": {
                  "$ref": "#/components/schemas/ArticlePopulated"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Article not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/unpublishedArticles": {
  "get": {
    "tags": ["Articles"],
    "summary": "Get all unpublished articles",
    "description": "Fetches all articles where `is_published` is false, with populated author email and category name. it will be given to the admin to publish the article",
    "responses": {
      "200": {
        "description": "List of unpublished articles",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article unpublished successfully"
                },
                "article": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ArticlePopulated"
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "No unpublished articles found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Article not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/getArticlesByUserId/{userId}": {
  "get": {
    "tags": ["Articles"],
    "summary": "Get articles by user ID",
    "description": "Fetches all articles created by a specific user, populated with the author's email and category name.",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The ID of the user whose articles are to be fetched"
      }
    ],
    "responses": {
      "200": {
        "description": "List of articles by the user",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ArticlePopulated"
              }
            }
          }
        }
      },
      "404": {
        "description": "No articles found for the user",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "No articles found for this user"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/createComment": {
  "post": {
    "tags": ["Comments"],
    "summary": "Create a new comment",
    "description": "Creates a new comment for a given article by an author.",
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "required": ["article", "author", "comment"],
            "properties": {
              "article": {
                "type": "string",
                "example": "642f9a4b132d7b1f14b23cde"
              },
              "author": {
                "type": "string",
                "example": "641f3a4b682d4c3f17c42dae"
              },
              "comment": {
                "type": "string",
                "example": "Great article! Thanks for sharing."
              }
            }
          }
        }
      }
    },
    "responses": {
      "201": {
        "description": "Comment created successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Comment created successfully"
                },
                "comment": {
                  "$ref": "#/components/schemas/Comment"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Something went wrong"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/deleteComment/{id}": {
  "delete": {
    "tags": ["Comments"],
    "summary": "Delete a comment",
    "description": "Deletes a specific comment by its ID.",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The ID of the comment to delete"
      }
    ],
    "responses": {
      "200": {
        "description": "Comment deleted successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Comment deleted successfully"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Comment not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Comment not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/updateComment/{id}": {
  "put": {
    "tags": ["Comments"],
    "summary": "Update a comment",
    "description": "Updates the text of a specific comment by its ID.",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The ID of the comment to update"
      }
    ],
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "comment": {
                "type": "string",
                "example": "Updated comment text"
              }
            }
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Comment updated successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Comment updated successfully"
                },
                "comment": {
                  "$ref": "#/components/schemas/Comment"
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "Comment not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Comment not found"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},
"/searchArticles": {
  "get": {
    "tags": ["Articles"],
    "summary": "Search articles by title or content",
    "description": "Searches the articles collection using a query string. Matches are case-insensitive and found in either the title or content fields.",
    "parameters": [
      {
        "name": "query",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "Search term to look for in article titles and content"
      }
    ],
    "responses": {
      "200": {
        "description": "List of matched articles",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ArticlePopulated"
              }
            }
          }
        }
      },
      "400": {
        "description": "Missing query parameter",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Query parameter is required"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "example": "Internal server error"
                },
                "error": {
                  "type": "string",
                  "example": "Error message goes here"
                }
              }
            }
          }
        }
      }
    }
  }
},



















  },
  "components": {
  "schemas": {
    "ArticlePopulated": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string",
          "example": "661234abcd1234abcd567890"
        },
        "title": {
          "type": "string",
          "example": "Intro to Robotics"
        },
        "description": {
          "type": "string",
          "example": "Learn the basics of robotics."
        },
        "image": {
          "type": "string",
          "example": "http://localhost:5000/uploads/image.png"
        },
        "author": {
          "type": "object",
          "properties": {
            "_id": { "type": "string", "example": "661012ab7c349dbb8d05e12a" },
            "email": { "type": "string", "example": "john@example.com" }
          }
        },
        "category": {
          "type": "object",
          "properties": {
            "_id": { "type": "string", "example": "661013cd7c349dbb8d05e12b" },
            "name": { "type": "string", "example": "Technology" }
          }
        },
        "is_active": { "type": "boolean", "example": true },
        "is_delete": { "type": "boolean", "example": false },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "example": "2025-04-05T08:00:00.000Z"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "example": "2025-04-06T10:00:00.000Z"
        }
      }
    },"Comment": {
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "example": "65fafd0c1abf79a45fc37d32"
    },
    "article": {
      "type": "string",
      "example": "642f9a4b132d7b1f14b23cde"
    },
    "author": {
      "type": "string",
      "example": "641f3a4b682d4c3f17c42dae"
    },
    "comment": {
      "type": "string",
      "example": "Great article!"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "example": "2025-04-05T10:25:00.000Z"
    }
  }
}

  }
}

  };
  
  
  
  export default swaggerDocument