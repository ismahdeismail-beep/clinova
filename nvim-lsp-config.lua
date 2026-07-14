-- Neovim LSP config snippet for Clinova (TypeScript).
-- typescript-language-server is installed globally (npm i -g typescript-language-server).
-- Place this in your Neovim config (e.g. ~/.config/nvim/lua/lsp/clinova.lua) or init.lua.

local lspconfig = require('lspconfig')
local lsp_capabilities = require('cmp_nvim_lsp').default_capabilities()

-- TypeScript / TSX via global typescript-language-server
lspconfig.typescript_language_server.setup({
  capabilities = lsp_capabilities,
  init_options = {
    preferences = {
      includeInlayParameterNameHints = 'all',
      includeInlayTypeHints = true,
    },
  },
  filetypes = { 'typescript', 'typescriptreact', 'javascript', 'javascriptreact' },
  root_markers = { 'package.json', 'tsconfig.json', '.git' },
})

-- ESLint LSP for diagnostics/quickfix (optional, pairs with eslint.config.js)
pcall(function()
  lspconfig.eslint.setup({
    capabilities = lsp_capabilities,
    on_attach = function(client, bufnr)
      vim.api.nvim_create_autocmd('BufWritePre', {
        buffer = bufnr,
        command = 'EslintFixAll',
      })
    end,
  })
end)

vim.api.nvim_create_autocmd('LspAttach', {
  callback = function(args)
    local buf = args.buf
    local opts = { buffer = buf, silent = true }
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, opts)
  end,
})
