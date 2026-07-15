-- Remove legacy brand and messaging terminology from all live article fields.
UPDATE posts
SET
  title = replace(replace(replace(title, 'KPI Plus Tech', 'NAVA'), 'KPI Plus', 'NAVA'), 'KPI+', 'NAVA'),
  description = replace(replace(replace(description, 'KPI Plus Tech', 'NAVA'), 'KPI Plus', 'NAVA'), 'KPI+', 'NAVA'),
  content_markdown = replace(
    replace(
      replace(
        replace(
          replace(
            replace(
              replace(
                replace(content_markdown, 'KPI Plus Tech', 'NAVA'),
                'KPI Plus', 'NAVA'
              ),
              'KPI+', 'NAVA'
            ),
            'soundbites', 'clear messages'
          ),
          'Soundbites', 'Clear messages'
        ),
        'soundbite', 'main takeaway'
      ),
      'Soundbite', 'Main takeaway'
    ),
    'SOUNDBITE', 'MAIN TAKEAWAY'
  ),
  takeaway = replace(replace(replace(takeaway, 'KPI Plus Tech', 'NAVA'), 'KPI Plus', 'NAVA'), 'KPI+', 'NAVA'),
  seo_title = replace(replace(replace(seo_title, 'KPI Plus Tech', 'NAVA'), 'KPI Plus', 'NAVA'), 'KPI+', 'NAVA'),
  seo_description = replace(replace(replace(seo_description, 'KPI Plus Tech', 'NAVA'), 'KPI Plus', 'NAVA'), 'KPI+', 'NAVA'),
  updated_at = '2026-07-15T00:15:00.000Z';
