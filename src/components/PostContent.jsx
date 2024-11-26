import React from 'react';
import ExternalLink from '@/components/typography/ExternalLink';
import styles from '@styles/components/PostPage.module.css';

// Helper function to parse post content
const parseContent = (content) => {
  if (!content) return null; // Early return if content is undefined or null

  const lines = content.split('\n'); // Split by new lines
  const parsedElements = [];
  let currentBlock = []; // Array to hold elements of the current block

  lines.forEach((line, index) => {
    // Check for headers in the format [header:size] Header Text
    const headerRegex = /\[header:(\d+)\]\s*(.*)/;
    const headerMatch = headerRegex.exec(line);
    if (headerMatch) {
      // If there is a current block, push it to parsedElements
      if (currentBlock.length > 0) {
        parsedElements.push(
          <div key={`block-${parsedElements.length}`} className={styles.block}>
            {currentBlock}
          </div>
        );
        currentBlock = []; // Reset the current block
      }

      const [, size, text] = headerMatch;
      const HeaderTag = `h${size}`; // Use template literals for the header tag
      currentBlock.push(React.createElement(HeaderTag, { key: index }, text));
      return; // Skip to the next iteration
    }

    // Check for unordered lists in the format [list] item1, item2, item3 [/list]
    else if (line.includes('[list]')) {
      const listItems = line
        .replace('[list]', '')
        .replace('[/list]', '')
        .split(',');
      currentBlock.push(
        <ul key={index} className={styles.list}>
          {listItems.map((item, idx) => (
            <li key={idx}>{item.trim()}</li>
          ))}
        </ul>
      );
    }

    // Check for tables in the format [table] row1:col1|col2, row2:col1|col2 [/table]
    else if (line.includes('[table]')) {
      const tableContent = line
        .replace('[table]', '')
        .replace('[/table]', '')
        .split(','); // Split rows by commas

      currentBlock.push(
        <table key={index} className={styles.table}>
          <thead>
            <tr>
              {tableContent[0] // First row as header
                .split('|')
                .map((header, colIndex) => (
                  <th key={colIndex}>{header.trim()}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableContent.slice(1).map((row, rowIndex) => {
              // Start from the second row
              const columns = row.split('|');
              return (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>{col.trim()}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      // Check for links in the format [link:display_text](link_redirect)
      let link_component;
      let updatedLine = line; // This will hold the line without the link text

      if (line.includes('[link:')) {
        const linkRegex = /\[link:(.*?)\]\((.*?)\)/g;
        const match = linkRegex.exec(line);

        if (match) {
          const [, link_display_text, link_redirect] = match;
          link_component = (
            <ExternalLink
              link_display_text={link_display_text}
              link_redirect={link_redirect}
              is_in_new_card={true}
            />
          );

          // Remove the link text from the line
          updatedLine = updatedLine.replace(match[0], '').trim(); // Replace the whole link pattern with empty string
        }
      }

      currentBlock.push(
        <p key={index}>
          {updatedLine} {link_component}
        </p>
      );
    }
  });

  // Push the last block if there are any elements remaining
  if (currentBlock.length > 0) {
    parsedElements.push(
      <div key={`block-${parsedElements.length}`} className={styles.block}>
        {currentBlock}
      </div>
    );
  }

  return parsedElements;
};

const PostContent = ({ content }) => {
  return <div>{parseContent(content)}</div>;
};

export default PostContent;
