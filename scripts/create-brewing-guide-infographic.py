#!/usr/bin/env python3
"""
Brewing Guide Infographic - Systematic Clarity Design
A modernist information design for Huila, Colombia coffee brewing parameters
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from PIL import Image
import os

# Register fonts
FONT_DIR = os.path.expanduser("~/.claude/skills/canvas-design/canvas-fonts")
pdfmetrics.registerFont(TTFont('WorkSans', f'{FONT_DIR}/WorkSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('WorkSans-Bold', f'{FONT_DIR}/WorkSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('IBMPlexMono', f'{FONT_DIR}/IBMPlexMono-Regular.ttf'))
pdfmetrics.registerFont(TTFont('IBMPlexMono-Bold', f'{FONT_DIR}/IBMPlexMono-Bold.ttf'))

# =============================================================================
# COLOR PALETTE - Systematic Clarity
# Color serves function, never decoration. Accent draws eye to critical data.
# =============================================================================
CHARCOAL = HexColor('#2C2C2C')      # Primary text, headings
WARM_GRAY = HexColor('#6B6560')     # Secondary text, labels, metadata
LIGHT_GRAY = HexColor('#E8E4E0')    # Backgrounds, table rows, dividers
CREAM = HexColor('#FAF8F5')         # Page background
ACCENT = HexColor('#275CA9')        # Brand blue - critical data, section numbers
ACCENT_LIGHT = HexColor('#C4D4E8')  # Subtle highlights (blue tint)

# =============================================================================
# GRID SYSTEM - The grid is sacred
# =============================================================================
WIDTH, HEIGHT = letter
MARGIN = 0.7 * inch                  # Generous margins frame content
CONTENT_WIDTH = WIDTH - (2 * MARGIN)
LEFT_EDGE = MARGIN                   # All content aligns to this edge

# Spacing scale for consistent rhythm
SPACE_XS = 4
SPACE_SM = 8
SPACE_MD = 16
SPACE_LG = 24
SPACE_XL = 32
SPACE_SECTION = 20  # Breathing room between major sections

# Logo paths
LOGO_DIR = os.path.expanduser("~/Claude/Library/images")
LOGO_1 = f"{LOGO_DIR}/hh-logo.png"
LOGO_2 = f"{LOGO_DIR}/melissas-logo.png"


def draw_logo_block(c, y):
    """Draw co-branded logos in top right: [logo1] X [logo2]
    - Both logos and X connector horizontally aligned on same baseline
    - Zero margin around logo group
    - Group top-aligned with page margin (same as title top)
    """
    logo_height = 44  # Target height for logos
    x_size = logo_height * 0.6  # X connector is 60% of logo height
    logo_spacing = 16  # Space on each side of the X

    # Load images to get aspect ratios
    img1 = Image.open(LOGO_1)
    img2 = Image.open(LOGO_2)

    # Calculate widths maintaining aspect ratio
    logo1_width = logo_height * (img1.width / img1.height)
    logo2_width = logo_height * (img2.width / img2.height)

    # Total block width (zero margin)
    block_width = logo1_width + logo_spacing + x_size + logo_spacing + logo2_width

    # Position: right edge at margin, top aligned with "BREWING GUIDE" cap height
    block_x = WIDTH - MARGIN - block_width
    title_cap_height = 26  # Approximate cap height for 36pt WorkSans-Bold
    top_y = y + title_cap_height  # Top of logo group

    # Draw logo 1 - top aligned
    logo1_y = top_y - logo_height
    c.drawImage(LOGO_1, block_x, logo1_y, width=logo1_width, height=logo_height, mask='auto')

    # Draw logo 2 - top aligned (same top as logo 1)
    logo2_x = block_x + logo1_width + logo_spacing + x_size + logo_spacing
    logo2_y = top_y - logo_height
    c.drawImage(LOGO_2, logo2_x, logo2_y, width=logo2_width, height=logo_height, mask='auto')

    # Draw X connector - vertically centered between the two logos
    x_center_x = block_x + logo1_width + logo_spacing + (x_size / 2)
    x_center_y = top_y - (logo_height / 2)
    half_size = x_size / 2 * 0.7

    c.setStrokeColor(LIGHT_GRAY)
    c.setLineWidth(1)
    # Diagonal line 1 (top-left to bottom-right)
    c.line(x_center_x - half_size, x_center_y + half_size,
           x_center_x + half_size, x_center_y - half_size)
    # Diagonal line 2 (top-right to bottom-left)
    c.line(x_center_x + half_size, x_center_y + half_size,
           x_center_x - half_size, x_center_y - half_size)


def draw_section_divider(c, y):
    """Draw a subtle divider line between sections"""
    y -= SPACE_SM
    c.setStrokeColor(LIGHT_GRAY)
    c.setLineWidth(0.75)
    c.line(LEFT_EDGE, y, LEFT_EDGE + CONTENT_WIDTH, y)
    return y - SPACE_SECTION


def draw_header(c, y):
    """Draw the header section with coffee origin info"""
    # Co-branded logos in top right
    draw_logo_block(c, y)

    # Main title - commands through size
    c.setFont('WorkSans-Bold', 36)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE, y, "BREWING GUIDE")

    # Accent rule - visual anchor
    y -= 10
    c.setFillColor(ACCENT)
    c.rect(LEFT_EDGE, y, 50, 3, fill=1, stroke=0)

    # Origin name with inline details
    y -= SPACE_XL
    c.setFont('WorkSans-Bold', 18)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE, y, "Huila, Colombia")

    # Inline origin details
    c.setFont('IBMPlexMono', 8)
    c.setFillColor(WARM_GRAY)
    details_x = LEFT_EDGE + c.stringWidth("Huila, Colombia", 'WorkSans-Bold', 18) + SPACE_MD
    c.drawString(details_x, y + 2, "Single Origin  ·  Medium Roast")

    # Technical details
    y -= SPACE_MD
    c.setFont('IBMPlexMono', 8)
    c.setFillColor(WARM_GRAY)
    c.drawString(LEFT_EDGE, y, "Castillo & Colombia Varietals  ·  1,200–1,800 MASL  ·  Washed Process")

    # Flavor profile box - tighter grouping with origin info
    y -= SPACE_MD
    box_height = 32
    box_y = y - box_height
    c.setFillColor(LIGHT_GRAY)
    c.rect(LEFT_EDGE, box_y, CONTENT_WIDTH, box_height, fill=1, stroke=0)

    # Flavor profile label
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(WARM_GRAY)
    c.drawString(LEFT_EDGE + 14, box_y + 21, "FLAVOR PROFILE")

    # Flavor notes
    c.setFont('WorkSans-Bold', 12)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE + 14, box_y + 8, "Milk Chocolate  ·  Roasted Almond  ·  Mild Citrus")

    return box_y - SPACE_XS


def draw_foundational_parameters(c, y):
    """Draw the foundational parameters section - the Golden Ratio"""
    # Section header with number
    c.setFont('IBMPlexMono-Bold', 9)
    c.setFillColor(ACCENT)
    c.drawString(LEFT_EDGE, y, "01")

    c.setFont('WorkSans-Bold', 13)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE + 28, y, "FOUNDATIONAL PARAMETERS")

    y -= SPACE_LG + 4

    # Three-column grid
    col_width = CONTENT_WIDTH / 3

    params = [
        ("RATIO", "1:16", "55g per liter"),
        ("WATER TEMP", "195–200°F", "90–93°C"),
        ("WATER QUALITY", "50–175 ppm", "pH ~7 (neutral)")
    ]

    for i, (label, value, sub) in enumerate(params):
        x = LEFT_EDGE + (i * col_width)

        # Label - small, uppercase, muted
        c.setFont('IBMPlexMono', 7)
        c.setFillColor(WARM_GRAY)
        c.drawString(x, y, label)

        # Value - large, bold, commands attention
        c.setFont('WorkSans-Bold', 26)
        c.setFillColor(CHARCOAL)
        c.drawString(x, y - 26, value)

        # Sub-value - supporting detail
        c.setFont('IBMPlexMono', 8)
        c.setFillColor(WARM_GRAY)
        c.drawString(x, y - 44, sub)

    return y - 52


def draw_methods_table(c, y):
    """Draw the brewing methods reference table"""
    # Section header
    c.setFont('IBMPlexMono-Bold', 9)
    c.setFillColor(ACCENT)
    c.drawString(LEFT_EDGE, y, "03")

    c.setFont('WorkSans-Bold', 13)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE + 28, y, "BREWING METHODS")

    y -= SPACE_LG

    # Table structure
    headers = ["METHOD", "DOSE", "WATER", "GRIND", "TEMP", "TIME"]
    col_widths = [1.05*inch, 1.1*inch, 1.0*inch, 0.95*inch, 0.85*inch, 0.95*inch]

    # Header row - dark background for contrast
    header_height = 20
    c.setFillColor(CHARCOAL)
    c.rect(LEFT_EDGE, y - 6, CONTENT_WIDTH, header_height, fill=1, stroke=0)

    x = LEFT_EDGE + 10
    c.setFont('IBMPlexMono-Bold', 7)
    c.setFillColor(CREAM)
    for i, header in enumerate(headers):
        c.drawString(x, y + 2, header)
        x += col_widths[i]

    y -= 22

    # Table data
    methods = [
        ("V60", "15–16g / 0.5oz", "250ml / 8.5oz", "Medium-fine", "195–200°F", "2:30–3:00"),
        ("Chemex", "32g / 1.1oz", "500ml / 17oz", "Medium", "198–202°F", "4:00–4:30"),
        ("Kalita Wave", "20g / 0.7oz", "320ml / 11oz", "Medium", "195–200°F", "3:00–3:30"),
        ("French Press", "30g / 1oz", "500ml / 17oz", "Coarse", "200°F", "4:00 + settle"),
        ("AeroPress", "15g / 0.5oz", "200ml / 7oz", "Medium-fine", "185–195°F", "1:30–2:00"),
        ("Cold Brew", "100g / 3.5oz", "1L / 34oz", "Extra coarse", "Cold", "16–20 hrs"),
        ("Drip", "55–60g / 2oz", "1L / 34oz", "Medium", "195–205°F", "4–6 min"),
        ("Espresso", "18g / 0.6oz", "36–40ml / 1.3oz", "Fine", "200–202°F", "25–30 sec"),
    ]

    row_height = 15

    for idx, row in enumerate(methods):
        # Zebra striping for readability
        if idx % 2 == 0:
            c.setFillColor(LIGHT_GRAY)
            c.rect(LEFT_EDGE, y - 3, CONTENT_WIDTH, row_height, fill=1, stroke=0)

        x = LEFT_EDGE + 10
        c.setFillColor(CHARCOAL)

        for i, cell in enumerate(row):
            if i == 0:
                c.setFont('WorkSans-Bold', 8)
            else:
                c.setFont('IBMPlexMono', 7)
            c.drawString(x, y + 2, cell)
            x += col_widths[i]

        y -= row_height

    return y - SPACE_SM


def draw_quick_doses(c, y):
    """Draw quick dose reference"""
    # Section header
    c.setFont('IBMPlexMono-Bold', 9)
    c.setFillColor(ACCENT)
    c.drawString(LEFT_EDGE, y, "02")

    c.setFont('WorkSans-Bold', 13)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE + 28, y, "QUICK DOSE GUIDE")

    y -= SPACE_LG - 2

    # Table header
    headers = ["BATCH SIZE", "COFFEE", "WATER"]
    col_widths = [2.0*inch, 2.3*inch, 2.3*inch]

    # Lighter header style
    c.setFillColor(LIGHT_GRAY)
    c.rect(LEFT_EDGE, y - 5, CONTENT_WIDTH, 18, fill=1, stroke=0)

    x = LEFT_EDGE + 12
    c.setFont('IBMPlexMono-Bold', 7)
    c.setFillColor(WARM_GRAY)
    for i, header in enumerate(headers):
        c.drawString(x, y + 2, header)
        x += col_widths[i]

    y -= 24

    # Dose data (1 cup = 5 fl oz / 150ml standard)
    doses = [
        ("1 Cup", "10g (0.35 oz)", "150ml (5 fl oz)"),
        ("2 Cups", "19g (0.65 oz)", "300ml (10 fl oz)"),
        ("4 Cups", "38g (1.3 oz)", "600ml (20 fl oz)"),
        ("6 Cups", "55–60g (2 oz)", "900ml (30 fl oz)"),
    ]

    row_height = 17

    for batch, coffee, water in doses:
        x = LEFT_EDGE + 12

        # Batch size
        c.setFont('WorkSans-Bold', 9)
        c.setFillColor(CHARCOAL)
        c.drawString(x, y, batch)
        x += col_widths[0]

        # Coffee - accent color signals importance
        c.setFont('IBMPlexMono-Bold', 9)
        c.setFillColor(ACCENT)
        c.drawString(x, y, coffee)
        x += col_widths[1]

        # Water
        c.setFont('IBMPlexMono', 9)
        c.setFillColor(CHARCOAL)
        c.drawString(x, y, water)

        y -= row_height

    # Yield note
    y -= SPACE_XS
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(WARM_GRAY)
    c.drawString(LEFT_EDGE, y, "Note: Grounds absorb 12–15% of water. Yield will be slightly less than water added.")

    return y - SPACE_SM


def draw_troubleshooting(c, y):
    """Draw troubleshooting section"""
    # Section header
    c.setFont('IBMPlexMono-Bold', 9)
    c.setFillColor(ACCENT)
    c.drawString(LEFT_EDGE, y, "04")

    c.setFont('WorkSans-Bold', 13)
    c.setFillColor(CHARCOAL)
    c.drawString(LEFT_EDGE + 28, y, "TROUBLESHOOTING")

    y -= SPACE_MD

    # Two-column layout
    issues = [
        ("SOUR / THIN", "Grind finer · Increase temp · Extend time"),
        ("BITTER / HARSH", "Grind coarser · Decrease temp · Shorten time"),
        ("WEAK FLAVOR", "Use more coffee · Target 1:16 ratio"),
        ("MISSING CHOCOLATE", "Increase temp to 195–200°F"),
    ]

    col_width = CONTENT_WIDTH / 2
    row_height = 26

    for i, (problem, solution) in enumerate(issues):
        col = i % 2
        row = i // 2
        x = LEFT_EDGE + (col * col_width)
        row_y = y - (row * row_height)

        # Problem - bold with subtle underline
        c.setFont('WorkSans-Bold', 8)
        c.setFillColor(CHARCOAL)
        c.drawString(x, row_y, problem)

        # Accent underline
        text_width = c.stringWidth(problem, 'WorkSans-Bold', 8)
        c.setStrokeColor(ACCENT_LIGHT)
        c.setLineWidth(1.5)
        c.line(x, row_y - 2, x + text_width, row_y - 2)

        # Solution
        c.setFont('IBMPlexMono', 7)
        c.setFillColor(WARM_GRAY)
        c.drawString(x, row_y - 12, solution)

    return y - (row_height * 2) - SPACE_XS


def draw_footer(c, y):
    """Draw footer with copyright and date below final section divider"""
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(WARM_GRAY)

    # Copyright - left aligned
    c.drawString(LEFT_EDGE, y + 4, "© 2026 Herb's House, LLC")

    # Date - right aligned
    c.drawRightString(WIDTH - MARGIN, y + 4, "JANUARY 2026")


def create_brewing_guide():
    """Main function to create the brewing guide infographic"""
    output_path = os.path.expanduser(
        "~/Claude/apps/partner-portal/public/assets/downloads/brewing-guide.pdf"
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    c = canvas.Canvas(output_path, pagesize=letter)

    # Page background
    c.setFillColor(CREAM)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

    # Build document from top to bottom
    y = HEIGHT - MARGIN - 15

    y = draw_header(c, y)
    y = draw_section_divider(c, y)
    y = draw_foundational_parameters(c, y)
    y = draw_section_divider(c, y)
    y = draw_quick_doses(c, y)
    y = draw_section_divider(c, y)
    y = draw_methods_table(c, y)
    y = draw_section_divider(c, y)
    y = draw_troubleshooting(c, y)
    y = draw_section_divider(c, y)
    draw_footer(c, y)

    c.save()
    print(f"Created: {output_path}")
    return output_path


if __name__ == "__main__":
    create_brewing_guide()
