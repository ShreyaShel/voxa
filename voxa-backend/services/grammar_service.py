# services/grammar_service.py

import language_tool_python

# Initialize grammar tool
tool = language_tool_python.LanguageTool('en-US')

def analyze_grammar(text: str):
    matches = tool.check(text)

    # Extract grammar feedback messages
    feedback = [match.message for match in matches]

    # Optional: limit to top 5 issues for clarity
    return feedback[:5]