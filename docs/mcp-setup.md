# MCP Server Setup Guide

MCP (Model Context Protocol) servers extend what Cursor's agent can *do*, not just read.
Without MCP, the agent can read/write files and run terminal commands.
With MCP, the agent can query your actual databases, open GitHub PRs, read Slack, and more.

This doc covers the two most valuable MCP setups for Edward's workflow.

---

## 1. GitHub MCP

**What it unlocks:** Agent can read issues and PRs, create branches, open PRs with real descriptions, check CI status — all from chat.

**Practical use:** "Open a PR for today's changes with a proper description" and it actually does it, not just print a template.

### Setup

1. Open **Cursor Settings** (Cmd + ,) > **MCP**
2. Click **Add new MCP server**
3. Use this config:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

4. Generate a token at [github.com/settings/tokens](https://github.com/settings/tokens)
   - Scopes needed: `repo`, `read:org`, `read:user`
   - Use a **fine-grained token** scoped to specific repos if you want tighter control
5. Restart Cursor

### Verify it works

In a new chat: "List my open GitHub issues on edwardl903/chesslytics"
The agent should list them without you pasting anything.

---

## 2. BigQuery MCP

**What it unlocks:** Agent can query your actual BigQuery tables and bring results into the conversation. Extremely useful for debugging dbt models or exploring data without switching to the BQ console.

**Practical use:** "Show me the last 10 rows of `fct_my_games` where I lost in under 10 moves" — agent runs the query, returns results, you iterate.

### Setup

```bash
pip install mcp-server-bigquery
```

Then in Cursor Settings > MCP:

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "python",
      "args": ["-m", "mcp_server_bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/your/service-account.json",
        "BIGQUERY_PROJECT": "your-gcp-project-id"
      }
    }
  }
}
```

Or using Application Default Credentials (if you have `gcloud auth application-default login` set up):

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "python",
      "args": ["-m", "mcp_server_bigquery"],
      "env": {
        "BIGQUERY_PROJECT": "your-gcp-project-id"
      }
    }
  }
}
```

### Verify it works

In a new chat: "Query my BigQuery project and show me which tables are in the chesslytics dataset"

---

## 3. Snowflake MCP (for future employer / interview projects)

If you end up at a company using Snowflake (very common in analytics engineering), add this:

```json
{
  "mcpServers": {
    "snowflake": {
      "command": "npx",
      "args": ["-y", "mcp-server-snowflake"],
      "env": {
        "SNOWFLAKE_ACCOUNT": "your-account",
        "SNOWFLAKE_USER": "your-user",
        "SNOWFLAKE_PASSWORD": "your-password",
        "SNOWFLAKE_DATABASE": "your-db",
        "SNOWFLAKE_SCHEMA": "your-schema",
        "SNOWFLAKE_WAREHOUSE": "your-warehouse"
      }
    }
  }
}
```

---

## Full `mcp.json` reference

Cursor stores MCP config in `~/.cursor/mcp.json`. You can edit it directly:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    },
    "bigquery": {
      "command": "python",
      "args": ["-m", "mcp_server_bigquery"],
      "env": {
        "BIGQUERY_PROJECT": "your-gcp-project-id"
      }
    }
  }
}
```

---

## Security notes

- **Never commit** `~/.cursor/mcp.json` or any file with real tokens.
- GitHub tokens: use fine-grained tokens scoped to specific repos, not classic tokens with broad access.
- BigQuery: use a service account with only the roles you need (`BigQuery Data Viewer` for read-only, `BigQuery Data Editor` for read/write). Do not use your personal GCP credentials.
- Rotate tokens if you ever accidentally expose them.

---

## What to do next

1. Set up GitHub MCP first — lowest friction, immediate payoff for PRs and issues.
2. Set up BigQuery MCP when you start a new data project or want to debug ChessLytics dbt models.
3. Add Snowflake MCP when starting a role that uses it.

*Last updated: 2026-07-04*
