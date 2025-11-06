#!/usr/bin/env python3
import re

# Read index.html
with open('index.html', 'r') as f:
    content = f.read()

# Mappings: text -> i18n key
mappings = [
    (r'<h2><i class="fas fa-folder-open"></i> Kategorie</h2>', 
     r'<h2><i class="fas fa-folder-open"></i> <span data-i18n="catCategories">Categories</span></h2>'),
    
    (r'<i class="fas fa-rocket"></i>\s*<h2>Witaj w Interview Prep!</h2>',
     r'<i class="fas fa-rocket"></i>\n                            <h2 data-i18n="welcomeTitle">Welcome to Interview Prep!</h2>'),
    
    (r'<p>Wybierz kategorię i poziom z menu po lewej, aby rozpocząć naukę\.</p>',
     r'<p data-i18n="welcomeSubtitle">Select a category and level from the left menu to start learning.</p>'),
    
    (r'<p>Plików z materiałami</p>',
     r'<p data-i18n="statFiles">Material Files</p>'),
    
    (r'<p>Pytań quizowych</p>',
     r'<p data-i18n="statQuestions">Quiz Questions</p>'),
    
    (r'<p>Kategorii technicznych</p>',
     r'<p data-i18n="statCategories">Technical Categories</p>'),
]

# Apply mappings
for pattern, replacement in mappings:
    content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

# Write back
with open('index.html', 'w') as f:
    f.write(content)

print("✓ Added i18n attributes to HTML elements")
