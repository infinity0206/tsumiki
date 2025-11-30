FROM rust:1.85-slim-bookworm

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install cargo-watch for development hot-reload
RUN cargo install cargo-watch --locked

# Install loco-cli
RUN cargo install loco-cli --locked

CMD ["cargo", "watch", "-x", "run -- start"]
