const { execSync } = require('node:child_process');
const crypto = require('node:crypto');
const { loadProjectConfig } = require('./project-config');

function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 16);
}

function getGitRoot(cwd) {
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      cwd,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return gitRoot || null;
  } catch {
    return null;
  }
}

function getContainerTag(cwd) {
  const projectConfig = loadProjectConfig(cwd);
  if (projectConfig?.personalContainerTag) {
    return projectConfig.personalContainerTag;
  }
  const gitRoot = getGitRoot(cwd);
  const basePath = gitRoot || cwd;
  return `claudecode_project_${sha256(basePath)}`;
}

function getRepoContainerTag(cwd) {
  const projectConfig = loadProjectConfig(cwd);
  if (projectConfig?.repoContainerTag) {
    return projectConfig.repoContainerTag;
  }
  const gitRoot = getGitRoot(cwd);
  const basePath = gitRoot || cwd;
  return `repo_${sha256(basePath)}`;
}

function getProjectName(cwd) {
  const gitRoot = getGitRoot(cwd);
  const basePath = gitRoot || cwd;
  return basePath.split('/').pop() || 'unknown';
}

function getUserContainerTag() {
  try {
    const email = execSync('git config user.email', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    if (email) return `claudecode_user_${sha256(email)}`;
  } catch {}
  const username = process.env.USER || process.env.USERNAME || 'anonymous';
  return `claudecode_user_${sha256(username)}`;
}

module.exports = {
  sha256,
  getGitRoot,
  getContainerTag,
  getRepoContainerTag,
  getProjectName,
  getUserContainerTag,
};
