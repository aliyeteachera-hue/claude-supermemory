# Claude-Supermemory

<img width="4000" height="2130" alt="image (6)" src="https://github.com/user-attachments/assets/07e63ac4-b67d-457b-9029-1dc5d860e920" />



> **✨ Requires [Supermemory Pro or above](https://console.supermemory.ai/billing)** - Unlock the state of the art memory for your Claude code.

A Claude Code plugin that gives your AI persistent memory across sessions using [Supermemory](https://supermemory.ai).
Your agent remembers what you worked on - across sessions, across projects.


## Features

- **Context Injection**: On session start, relevant memories are automatically injected into Claude's context
- **Automatic Capture**: Conversation turns are captured and stored for future context
- **Codebase Indexing**: Index your project's architecture, patterns, and conventions

## Installation

```bash
# Add the plugin marketplace
/plugin marketplace add supermemoryai/claude-supermemory

# Or from local directory
/plugin marketplace add /path/to/claude-supermemory

# Install the plugin
/plugin install claude-supermemory

# Set your API key
export SUPERMEMORY_CC_API_KEY="sm_..."
```

Get your API key at [console.supermemory.ai](https://console.supermemory.ai).

## How It Works

### On Session Start

The plugin fetches relevant memories from Supermemory and injects them into Claude's context:

```
<supermemory-context>
The following is recalled context about the user...

## User Profile (Persistent)
- Prefers TypeScript over JavaScript
- Uses Bun as package manager

## Recent Context
- Working on authentication flow

</supermemory-context>
```

### During Session

Conversation turns are automatically captured on each stop and stored for future context.

### Skills

**super-search**: When you ask about past work, previous sessions, or want to recall information, the agent automatically searches your memories.

## Commands

### /claude-supermemory:index

Index your codebase into Supermemory. Explores project structure, architecture, conventions, and key files.

```
/claude-supermemory:index
```

### /claude-supermemory:logout

Log out from Supermemory and clear saved credentials.

```
/claude-supermemory:logout
```

## Configuration

### Environment Variables

```bash
# Required
SUPERMEMORY_CC_API_KEY=sm_...

# Optional
SUPERMEMORY_SKIP_TOOLS=Read,Glob,Grep    # Tools to not capture
SUPERMEMORY_DEBUG=true                    # Enable debug logging
```

### Settings File

Create `~/.supermemory-claude/settings.json`:

```json
{
  "skipTools": ["Read", "Glob", "Grep", "TodoWrite"],
  "captureTools": ["Edit", "Write", "Bash", "Task"],
  "maxProfileItems": 5,
  "debug": false
}
```

## License

MIT
