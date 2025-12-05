package config

import (
    "context"
    "fmt"
    "log"
    "os"
    "time"

    "github.com/joho/godotenv"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

func ConnectDatabase() (*mongo.Client, error) {
    // load .env
    _ = godotenv.Load()

    uri := os.Getenv("MONGODB_URI")
    if uri == "" {
        return nil, fmt.Errorf("MONGODB_URI is not set")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
    if err != nil {
        return nil, err
    }

    if err := client.Ping(ctx, readpref.Primary()); err != nil {
        return nil, err
    }

    log.Println("Connected to MongoDB")
    return client, nil
}
