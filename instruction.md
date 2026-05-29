Things are greatly messed up...

Let's reconstruct the entire architecture from scratch.

1. Desired Architecture: (1) I provide all information to jupyter notebook input form, (2) generate an entry, (3) those entries get reflected to the website code. Then, it's my job to preview the contents and push to the gitbub.
3. Each content type may have different locations to be displayed.
3.1 publication
- date, type {Books, Chapters, Refereed Journal Articles, Refereed Conference Proceedings}, title, keywords, venue, authors, url to the pdf
- will be displayed on About's Recent News, Research's Publication section
3.2 presentation
- date, title, type {Keynotes, Invited Talks, Refereed Presentations, Refereed Posters, Non-Refereed Presentations, Non-Refereed Panels, Workshops, Demo}, keywords, venue, authors, url to image or pdf
- will be displayed on About's Recent News. If the content has to image or pdf, it should be dispalyed on the right had side of each content's row
- workshops and demo will be displayed on Projects
3.3 project
- date, title, description, keywords, authors, url to {external website or embedded project info page} 
- will be displayed on About's Recent News and Projects
3.4 news:
- this is an additional news content that I want to add. For example, I do not want to display the list of grants and awards I received, but I may put that news in my Recent News section in About page.
- About (or index.html)'s Recent News section should have designated form where there is a dropdown checklist of contents I have created. I can select from 0 to 5 at most contents.
- News (or news.html) where ALL content entries will be shown by descending date order, and can be filtered by the sub categories (publication, presentation, project, others (this is the additional news I would create)).
3.3 blog
- date, title, blog content, keywords

Some side notes.
- maybe I should rename projects.html as it can contain demo, workshop, softwares and application I develop can be displayed
- all entries can be empty, but at least date and title should be filled

MUST ask if you have any questions.