import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

function readContacts() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    if (!raw.trim()) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

function writeContacts(contacts) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
}

// POST - receive a new contact form submission
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const contacts = readContacts();

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      status: 'new', // new, read, replied
    };

    contacts.unshift(newContact); // add to beginning (newest first)
    writeContacts(contacts);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}

// GET - retrieve all contact submissions (for admin panel)
export async function GET() {
  try {
    const contacts = readContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// PATCH - update a contact's status (mark as read, replied, etc.)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const contacts = readContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    contacts[index].status = status;
    writeContacts(contacts);

    return NextResponse.json({ success: true, contact: contacts[index] });
  } catch (error) {
    console.error('Contact update error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE - delete a contact submission
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const contacts = readContacts();
    const filtered = contacts.filter((c) => c.id !== id);

    if (filtered.length === contacts.length) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    writeContacts(filtered);
    return NextResponse.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    console.error('Contact delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
