import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

export type ExportFormat = 'pdf' | 'docx' | 'md' | 'txt';

export interface ExportOptions {
  title: string;
  content: string;
  filename?: string;
  format: ExportFormat;
  metadata?: {
    author?: string;
    subject?: string;
    keywords?: string[];
    date?: string;
  };
  styles?: {
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  };
}

export interface DocumentSection {
  type: 'heading' | 'paragraph' | 'bullet' | 'numbered' | 'table' | 'code' | 'hr';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  items?: string[];
  tableData?: { headers: string[]; rows: string[][] };
  language?: string;
}

export interface StructuredDocument {
  title: string;
  sections: DocumentSection[];
  metadata?: {
    author?: string;
    subject?: string;
    date?: string;
  };
}

const exportService = {
  async exportToPDF(options: ExportOptions): Promise<Blob> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginLeft = options.styles?.marginLeft || 20;
    const marginRight = options.styles?.marginRight || 20;
    const marginTop = options.styles?.marginTop || 20;
    const marginBottom = options.styles?.marginBottom || 20;
    const contentWidth = pageWidth - marginLeft - marginRight;
    const fontSize = options.styles?.fontSize || 11;
    const lineHeight = options.styles?.lineHeight || 1.5;

    doc.setFont('helvetica');
    doc.setFontSize(fontSize);

    let y = marginTop;

    const addText = (text: string, x: number, yPos: number, opts?: { fontSize?: number; fontStyle?: string; color?: string; align?: 'left' | 'center' | 'right'; lineHeight?: number }) => {
      const textFontSize = opts?.fontSize || fontSize;
      doc.setFontSize(textFontSize);
      if (opts?.fontStyle) doc.setFont('helvetica', opts.fontStyle);
      if (opts?.color) doc.setTextColor(opts.color);
      
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, x, yPos, { align: opts?.align || 'left' });
      return lines.length * textFontSize * 0.352778 * (opts?.lineHeight || 1.5);
    };

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - marginBottom) {
        doc.addPage();
        y = marginTop;
      }
    };

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(options.title, contentWidth);
    doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
    y += titleLines.length * 10 + 10;

    // Metadata
    if (options.metadata) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      let metaY = y;
      if (options.metadata.author) {
        doc.text(`Author: ${options.metadata.author}`, marginLeft, metaY);
        metaY += 5;
      }
      if (options.metadata.date) {
        doc.text(`Date: ${options.metadata.date}`, marginLeft, metaY);
        metaY += 5;
      }
      if (options.metadata.subject) {
        doc.text(`Subject: ${options.metadata.subject}`, marginLeft, metaY);
        metaY += 5;
      }
      y = metaY + 5;
    }

    // Horizontal rule
    doc.setDrawColor(200, 200, 200);
    doc.line(marginLeft, y, pageWidth - marginRight, y);
    y += 10;

    // Content
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    const lines = doc.splitTextToSize(options.content, contentWidth);
    for (const line of lines) {
      checkPageBreak(5);
      doc.text(line, marginLeft, y);
      y += fontSize * 0.352778 * 1.5;
    }

    return doc.output('blob');
  },

  async exportToDOCX(options: ExportOptions): Promise<Blob> {
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: (options.styles?.marginTop || 20) * 36000,
              bottom: (options.styles?.marginBottom || 20) * 36000,
              left: (options.styles?.marginLeft || 20) * 36000,
              right: (options.styles?.marginRight || 20) * 36000,
            },
          },
        },
        children: [
          // Title
          new Paragraph({
            text: options.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
          }),
          // Metadata
          ...(options.metadata ? [
            new Paragraph({
              children: [
                new TextRun({ text: `Author: ${options.metadata.author || 'Clinova'}`, size: 20, color: '666666' }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Date: ${options.metadata.date || new Date().toLocaleDateString()}`, size: 20, color: '666666' }),
              ],
              spacing: { after: 120 },
            }),
          ] : []),
          new Paragraph({
            children: [
              new TextRun({ text: '', size: 24 }),
            ],
            border: { bottom: { color: 'CCCCCC', size: 1, style: BorderStyle.SINGLE } },
            spacing: { after: 240 },
          }),
          // Content
          new Paragraph({
            text: options.content,
            spacing: { line: 276, after: 120 },
            alignment: AlignmentType.LEFT,
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
  },

  exportToMarkdown(options: ExportOptions): string {
    let md = '';
    
    // Title
    md += `# ${options.title}\n\n`;
    
    // Metadata
    if (options.metadata) {
      if (options.metadata.author) md += `**Author:** ${options.metadata.author}\n`;
      if (options.metadata.date) md += `**Date:** ${options.metadata.date}\n`;
      if (options.metadata.subject) md += `**Subject:** ${options.metadata.subject}\n`;
      md += '\n---\n\n';
    }
    
    // Content
    md += options.content;
    
    return md;
  },

  exportToText(options: ExportOptions): string {
    let txt = '';
    
    // Title
    txt += `${options.title}\n`;
    txt += '='.repeat(options.title.length) + '\n\n';
    
    // Metadata
    if (options.metadata) {
      if (options.metadata.author) txt += `Author: ${options.metadata.author}\n`;
      if (options.metadata.date) txt += `Date: ${options.metadata.date}\n`;
      if (options.metadata.subject) txt += `Subject: ${options.metadata.subject}\n`;
      txt += '\n';
    }
    
    // Content
    txt += options.content;
    
    return txt;
  },

  async export(options: ExportOptions): Promise<{ blob: Blob; filename: string }> {
    let blob: Blob;
    let filename = options.filename || `clinova-${options.title.toLowerCase().replace(/\s+/g, '-')}`;
    
    switch (options.format) {
      case 'pdf':
        blob = await this.exportToPDF(options);
        filename += '.pdf';
        break;
      case 'docx':
        blob = await this.exportToDOCX(options);
        filename += '.docx';
        break;
      case 'md': {
        const md = this.exportToMarkdown(options);
        blob = new Blob([options.content], { type: 'text/markdown' });
        filename += '.md';
        break;
      }
      case 'txt': {
        const txt = this.exportToText(options);
        blob = new Blob([options.content], { type: 'text/plain' });
        filename += '.txt';
        break;
      }
      default:
        throw new Error(`Unsupported format: ${options.format}`);
    }
    
    return { blob, filename };
  },

  download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async exportAndDownload(options: ExportOptions): Promise<void> {
    const { blob, filename } = await this.export(options);
    this.download(blob, filename);
  },
};

export default exportService;